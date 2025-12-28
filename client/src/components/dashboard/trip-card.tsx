import React, { useState } from "react";
import { Link } from "wouter";
import { Heart } from "lucide-react";
import { DEFAULT_IMAGE_URL } from "@/lib/constants";

// Map of destination names to their image URLs
const destinationImages: Record<string, string> = {
  "Paris": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&h=400",
  "Rome": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&h=400",
  "Santorini": "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&h=400",
  "Tokyo": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&h=400",
  "Bali": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&h=400",
  "London": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&h=400",
  "New York": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&h=400",
  "Dubai": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&h=400",
  "default": DEFAULT_IMAGE_URL
};
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trip } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
// ...existing imports...
import PhotoGallery from "./photo-gallery";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";

interface TripCardProps {
  trip: Trip;
  destinationName: string;
  destinationCountry: string;
}

export function TripCard({ trip, destinationName, destinationCountry }: TripCardProps) {
  const [favorite, setFavorite] = useState(trip.isFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isPhotosOpen, setIsPhotosOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsLoading(true);
    try {
      const updatedTrip = await apiRequest("PATCH", `/api/trips/${trip.id}`, {
        isFavorite: !favorite
      });
      setFavorite(!favorite);
      queryClient.invalidateQueries({ queryKey: [`/api/users/${trip.userId}/trips`] });
      
      toast({
        title: !favorite ? "Added to favorites" : "Removed from favorites",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not update favorite status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formattedStartDate = format(new Date(trip.startDate), "MMM dd");
  const formattedEndDate = format(new Date(trip.endDate), "MMM dd");

  const handleViewPhotos = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await apiRequest("GET", `/api/trips/${trip.id}/photos`);
      setPhotos(res || []);
      setIsPhotosOpen(true);
    } catch (err) {
      toast({ title: "Error", description: "Failed to load photos", variant: "destructive" });
    }
  };

  return (
    <Card className="overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img 
          src={
            trip.photoId 
              ? `/api/photos/${trip.photoId}/raw` 
              : (trip.imageUrl || destinationImages[destinationName] || destinationImages.default)
          }
          alt={destinationName} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            // If the image fails to load, try the default image
            const currentSrc = e.currentTarget.src;
            if (trip.imageUrl && currentSrc.includes(trip.imageUrl)) {
              // If custom imageUrl fails, try destination image
              e.currentTarget.src = destinationImages[destinationName] || destinationImages.default;
            } else if (currentSrc !== destinationImages.default) {
              // If all else fails, use default image
              e.currentTarget.src = destinationImages.default;
            }
          }}
        />
        <div className="absolute top-4 right-4">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-white/90"
            onClick={handleToggleFavorite}
            disabled={isLoading}
          >
            <Heart 
              className={favorite ? "text-red-500 fill-red-500" : "text-gray-500"} 
              size={16} 
            />
          </Button>
        </div>
      </div>
      <CardContent className="p-5">
        <div className="flex items-center mb-2">
          <span className="inline-block bg-indigo-100 text-primary rounded-full px-3 py-1 text-xs font-medium">
            <span className="mr-1">📅</span>
            {formattedStartDate} - {formattedEndDate}
          </span>
        </div>
        <h2 className="font-bold text-base mb-1 text-gray-900">
          {trip.title}
        </h2>
        <h3 className="font-semibold text-sm mb-2 text-gray-600">
          {destinationName}, {destinationCountry}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {trip.description || `Explore the wonders of ${destinationName} on your upcoming adventure.`}
        </p>
        <div className="flex justify-between items-center">
          <Link href={`/trips/${trip.id}`}>
            <a className="text-primary font-medium text-sm">View trip</a>
          </Link>
          <button onClick={handleViewPhotos} className="ml-4 text-primary font-medium text-sm">View Photos</button>
        </div>
      </CardContent>
      <Dialog open={isPhotosOpen} onOpenChange={setIsPhotosOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogTitle>Photos for {destinationName}</DialogTitle>
          <div className="mt-4">
            <PhotoGallery photos={photos} userId={trip.userId} />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default TripCard;
