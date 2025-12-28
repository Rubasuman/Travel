import { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Photo } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { FALLBACK_IMAGE_URL } from "@/lib/constants";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PhotoGalleryProps {
  photos: Photo[];
  userId?: number;
}

export function PhotoGallery({ photos, userId }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [srcMap, setSrcMap] = useState<Record<number, string>>({});
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    async function checkImageLoads(url: string, timeout = 6000): Promise<boolean> {
      return new Promise((resolve) => {
        const img = new Image();
        let done = false;
        const timer = setTimeout(() => {
          if (!done) { done = true; resolve(false); }
        }, timeout);
        img.onload = () => { if (!done) { done = true; clearTimeout(timer); resolve(true); } };
        img.onerror = () => { if (!done) { done = true; clearTimeout(timer); resolve(false); } };
        img.src = url;
      });
    }

    async function resolveUrlForPhoto(p: Photo): Promise<string | undefined> {
      try {
        const value = p.imageUrl;
        // If it's already a full URL, try it first
        try {
          const maybeUrl = new URL(value);
          if (maybeUrl.pathname.includes('/storage/v1/object/public/') || maybeUrl.protocol.startsWith('http')) {
            const ok = await checkImageLoads(value);
            if (ok) return value;
          }
        } catch (e) {
          // not a full URL, continue
        }

        // Expect stored format "bucket/path/to/object"
        const parts = value.split('/');
        const bucket = parts.shift();
        const objectPath = parts.join('/');
        if (!bucket || !objectPath) return undefined;

        // Try client-side public URL via Supabase client (works if bucket is public)
        try {
          const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(objectPath);
          const publicUrl = urlData?.publicUrl;
          if (publicUrl) {
            const ok = await checkImageLoads(publicUrl);
            if (ok) return publicUrl;
          }
        } catch (e) {
          console.warn('Supabase getPublicUrl failed for', value, e);
        }

        // Fall back to server-signed URL
        try {
          const res = await fetch(`/api/photos/${p.id}/signed-url`, { credentials: 'include' });
          if (!res.ok) {
            console.warn('Signed URL fetch failed for photo', p.id, res.status);
            return undefined;
          }
          const json = await res.json().catch(() => null);
          if (json?.signedUrl) return json.signedUrl;
        } catch (err) {
          console.error('Failed to fetch signed url for photo', p.id, err);
        }

        return undefined;
      } catch (err) {
        console.error('resolveUrlForPhoto error', err);
        return undefined;
      }
    }

    async function fetchResolvedUrls() {
      const map: Record<number, string> = {};
      await Promise.all(
        photos.map(async (p) => {
          const url = await resolveUrlForPhoto(p);
          if (url) map[p.id] = url;
        })
      );
      if (mounted) setSrcMap(map);
    }

    if (photos && photos.length > 0) fetchResolvedUrls();
    return () => { mounted = false; };
  }, [photos]);

  const handlePhotoView = (photo: Photo) => {
  setSelectedPhoto(photo);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent, photo: Photo) => {
    e.stopPropagation();
    setPhotoToDelete(photo);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!photoToDelete) return;
    
    try {
      await apiRequest("DELETE", `/api/photos/${photoToDelete.id}`, {});
      queryClient.invalidateQueries({ queryKey: [`/api/users/${userId}/photos`] });
      
      toast({
        title: "Photo deleted",
        description: "The photo has been removed from your gallery",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete photo",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map((photo) => (
        <div 
          key={photo.id} 
          className="relative rounded-lg overflow-hidden group aspect-square"
          onClick={() => handlePhotoView(photo)}
        >
          <img 
            src={srcMap[photo.id] ?? photo.imageUrl ?? FALLBACK_IMAGE_URL} 
            alt={photo.caption || "Travel memory"} 
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Image failed to load', { src: srcMap[photo.id] ?? photo.imageUrl, errorEvent: e });
              e.currentTarget.src = FALLBACK_IMAGE_URL;
            }}
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="text-white">
              <div className="flex space-x-3">
                <button 
                  className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
                  onClick={() => handlePhotoView(photo)}
                >
                  <Eye size={18} />
                </button>
                <button 
                  className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
                  onClick={(e) => handleDeleteClick(e, photo)}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Photo View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-lg">
          <DialogTitle>{selectedPhoto?.caption || "Travel Photo"}</DialogTitle>
          <DialogDescription>
            Uploaded on {selectedPhoto && new Date(selectedPhoto.uploadedAt).toLocaleDateString()}
          </DialogDescription>
          <div className="mt-4">
            <img
              src={selectedPhoto ? (srcMap[selectedPhoto.id] ?? selectedPhoto.imageUrl ?? FALLBACK_IMAGE_URL) : FALLBACK_IMAGE_URL}
              alt={selectedPhoto?.caption || "Travel memory"}
              className="w-full h-auto rounded-md"
              onError={(e) => {
                e.currentTarget.src = FALLBACK_IMAGE_URL;
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the photo from your gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PhotoGallery;
