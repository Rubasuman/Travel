import { useState } from "react";
import { Link } from "wouter";
import { Heart, Clipboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trip } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface TripCardProps {
  trip: Trip;
  destinationName: string;
  destinationCountry: string;
}

export function TripCard({ trip, destinationName, destinationCountry }: TripCardProps) {
  const [favorite, setFavorite] = useState(trip.isFavorite);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <Card className="overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img 
          src={trip.imageUrl} 
          alt={destinationName} 
          className="w-full h-48 object-cover"
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
        <h3 className="font-bold text-lg mb-1">
          {destinationName}, {destinationCountry}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {trip.description || `Explore the wonders of ${destinationName} on your upcoming adventure.`}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Clipboard className="text-gray-400 mr-1.5" size={16} />
            <span className="text-sm text-gray-600">{trip.activities || 0} activities planned</span>
          </div>
          <Link href={`/trips/${trip.id}`}>
            <a className="text-primary font-medium text-sm">View trip</a>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default TripCard;
