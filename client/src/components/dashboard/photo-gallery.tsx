import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { Photo } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
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
  userId: number;
}

export function PhotoGallery({ photos, userId }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photoToDelete, setPhotoToDelete] = useState<Photo | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

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
            src={photo.imageUrl} 
            alt={photo.caption || "Travel memory"} 
            className="w-full h-full object-cover"
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
              src={selectedPhoto?.imageUrl}
              alt={selectedPhoto?.caption || "Travel memory"}
              className="w-full h-auto rounded-md"
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
