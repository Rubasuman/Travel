import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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

const formSchema = z.object({
  tripId: z.string().optional(),
  caption: z.string().optional(),
  imageFile: z.instanceof(File).refine(file => file.size < 5 * 1024 * 1024, {
    message: "Image must be less than 5MB",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface UploadPhotoFormProps {
  userId: number;
  trips: any[];
  onSuccess: () => void;
}

export default function UploadPhotoForm({ userId, trips, onSuccess }: UploadPhotoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const storage = getStorage();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tripId: "",
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
      // Upload the image to Firebase Storage
      const fileRef = ref(storage, `photos/${userId}/${Date.now()}-${data.imageFile.name}`);
      await uploadBytes(fileRef, data.imageFile);
      const imageUrl = await getDownloadURL(fileRef);
      
      // Save the photo details to the database
      await apiRequest("POST", "/api/photos", {
        userId,
        tripId: data.tripId && data.tripId !== "none" ? parseInt(data.tripId) : null,
        imageUrl,
        caption: data.caption,
        uploadedAt: new Date().toISOString(),
      });
      
      toast({
        title: "Photo uploaded",
        description: "Your photo has been successfully uploaded",
      });
      
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/photos`] });
      
      if (data.tripId) {
        queryClient.invalidateQueries({ queryKey: [`/api/trips/${data.tripId}/photos`] });
      }
      
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload photo. Please try again.",
        variant: "destructive",
      });
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
