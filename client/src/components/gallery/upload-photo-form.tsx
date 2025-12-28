import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Image } from "lucide-react";

// Change this if your storage bucket has a different name
const BUCKET_NAME = 'photos';

const formSchema = z.object({
  tripId: z.string().optional(),
  caption: z.string().optional(),
  imageFile: z.instanceof(File).refine(file => file.size < 5 * 1024 * 1024, {
    message: "Image must be less than 5MB",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface UploadPhotoFormProps {
  userId?: number;
  username?: string;
  trips: any[];
  onSuccess?: () => void;
}

export default function UploadPhotoForm({ userId, username, trips, onSuccess }: UploadPhotoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  // supabase client from lib

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripId: "none",
      caption: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("imageFile", file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImageSelection = () => {
    form.setValue("imageFile", undefined as any);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "You must be logged in to upload photos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Upload the image to Supabase Storage
      // Use username as the folder name, fallback to userId if username is not available
      const folderName = username || `user-${userId}`;
      const filePath = `${folderName}/${Date.now()}-${data.imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, data.imageFile);
      if (uploadError) {
        console.error('Supabase storage upload error:', uploadError);
        const msg = uploadError?.message || JSON.stringify(uploadError);
        // Detect missing bucket and give actionable guidance
        if (/bucket/i.test(msg) || (uploadError as any)?.status === 404) {
          toast({
            title: "Storage bucket not found",
            description: `Bucket '${BUCKET_NAME}' not found in Supabase storage. Create it in the Supabase dashboard or update BUCKET_NAME in the app.`,
            variant: "destructive",
          });
        }
        throw new Error(msg);
      }

      // We will store the storage path (bucket + object path) as the photo.imageUrl
      // This avoids relying on public URLs (which fail for private buckets) and
      // lets the server generate signed URLs when needed.
      const storagePath = filePath; // e.g. "123/169...-photo.jpg"
      const imageUrl = `${BUCKET_NAME}/${storagePath}`; // stored as "bucket/path/to/file"
      // Still log the public URL if available for debugging
      const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
      console.log('Supabase upload result', { filePath, storagePath, publicUrl: urlData?.publicUrl, urlData });
      
      // Prepare payload for server
      const payload = {
        userId,
        tripId: data.tripId && data.tripId !== 'none' ? parseInt(data.tripId) : null,
        imageUrl, // form: "bucket/path/to/file.jpg"
        caption: data.caption,
      };

      // Optimistic UI: insert a temporary photo into the query cache so the gallery
      // displays the uploaded image immediately even if the server POST fails.
      try {
        const tempId = -Date.now();
        const tempPhoto = {
          id: tempId,
          userId,
          tripId: payload.tripId,
          imageUrl: payload.imageUrl,
          caption: payload.caption,
          uploadedAt: new Date().toISOString(),
        } as any;

        queryClient.setQueryData([`/api/users/${userId}/photos`], (old: any) => {
          if (!old) return [tempPhoto];
          return [tempPhoto, ...old];
        });

        if (payload.tripId) {
          queryClient.setQueryData([`/api/trips/${payload.tripId}/photos`], (old: any) => {
            if (!old) return [tempPhoto];
            return [tempPhoto, ...old];
          });
        }
      } catch (e) {
        console.warn('Optimistic UI update failed', e);
      }

      // Notify user that upload to storage succeeded
      toast({
        title: "Photo uploaded",
        description: "Your photo has been uploaded to storage",
      });

      // Helper: persist failed payloads locally for retry
      const storePendingPhoto = (p: any) => {
        try {
          const key = 'pending_photos';
          const existing = JSON.parse(localStorage.getItem(key) || '[]');
          existing.push({ payload: p, createdAt: new Date().toISOString() });
          localStorage.setItem(key, JSON.stringify(existing));
        } catch (e) {
          console.warn('Failed to store pending photo', e);
        }
      };

      // Attempt to save metadata to server, but do not block display on failure.
      try {
        const res = await fetch("/api/photos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          let text = '';
          try {
            const json = await res.json().catch(() => null);
            if (json) {
              text = JSON.stringify(json);
              // If it's a validation error for uploadedAt, store pending and show non-destructive toast
              if (res.status === 400 && json?.message && String(json.message).includes('Invalid photo data')) {
                storePendingPhoto(payload);
                toast({
                  title: 'Photo visible',
                  description: 'Image uploaded to storage and will be saved to your gallery when the server accepts it (queued).',
                });
                // Do not throw or show destructive toast
                return;
              }
            } else {
              text = await res.text();
            }
          } catch (e) {
            text = `Could not read response body: ${String(e)}`;
          }
          console.error("/api/photos returned non-OK", { status: res.status, statusText: res.statusText, body: text });
          // General failure: store pending and warn the user (non-destructive)
          storePendingPhoto(payload);
          toast({
            title: "Warning",
            description: "Image saved in storage but saving metadata failed. It'll be retried automatically.",
            variant: "default",
          });
        } else {
          // Refresh the photos list to get authoritative data from server
          queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/photos`] });
          if (payload.tripId) {
            queryClient.invalidateQueries({ queryKey: [`/api/trips/${payload.tripId}/photos`] });
          }
        }
      } catch (err) {
        console.error("Direct POST /api/photos failed:", err);
        // Network-level failure: persist and show non-destructive toast
        storePendingPhoto(payload);
        toast({
          title: "Warning",
          description: "Image uploaded but saving metadata failed (network). It'll be retried automatically.",
          variant: "default",
        });
      }
      
  onSuccess?.();
    } catch (error) {
      console.error('Upload photo error:', error);
      // Try a quick diagnostic ping to the backend so the user can see if the API is reachable
      try {
        const pingRes = await fetch('/api/ping', { credentials: 'include' });
        const pingJson = await pingRes.json().catch(() => null);
        console.warn('Backend ping result', { status: pingRes.status, body: pingJson });
        toast({
          title: "Error",
          description: `${(error as any)?.message ? String((error as any).message) : "Failed to upload photo."}  ping: ${pingRes.status}`,
          variant: "destructive",
        });
      } catch (pingErr) {
        console.error('Ping failed', pingErr);
        toast({
          title: "Error",
          description: "Failed to upload photo and backend ping failed. Check the server is running.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
          {previewUrl ? (
            <div className="relative w-full">
              <img
                src={previewUrl}
                alt="Preview"
                className="rounded-lg max-h-60 mx-auto object-contain"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={clearImageSelection}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <>
              <Image className="h-16 w-16 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 mb-4">
                PNG, JPG or JPEG (max. 5MB)
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Select Photo
              </Button>
            </>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />
          {!previewUrl && (
            <FormField
              control={form.control}
              name="imageFile"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={(e) => {
                        handleFileChange(e);
                        onChange(e.target.files?.[0]);
                      }}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        
        <FormField
          control={form.control}
          name="tripId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Associate with Trip (optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a trip" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {trips.map((trip) => (
                    <SelectItem key={trip.id} value={trip.id.toString()}>
                      {trip.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Link this photo to one of your trips
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a caption to your photo"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !previewUrl}>
            {isSubmitting ? "Uploading..." : "Upload Photo"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
