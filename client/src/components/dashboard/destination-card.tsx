import { Star, Heart } from "lucide-react";
import { Destination } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DestinationCardProps {
  destination: Destination;
  isFavorite?: boolean;
  onSelect?: (destination: Destination) => void;
  onToggleFavorite?: (destination: Destination) => void;
}

export function DestinationCard({ destination, isFavorite, onSelect, onToggleFavorite }: DestinationCardProps) {
  const { toast } = useToast();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) onToggleFavorite(destination);
    toast({
      title: !isFavorite ? "Added to favorites" : "Removed from favorites",
      variant: "default",
    });
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(destination);
    }
  };

  return (
    <div className="flex-shrink-0 w-64">
      <div className="relative rounded-xl overflow-hidden group" onClick={handleSelect}>
        <img 
          src={destination.imageUrl ?? undefined}
          alt={destination.name} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-white font-bold">{destination.name}, {destination.country}</h3>
          <div className="flex items-center text-white text-xs mt-1">
            <Star className="text-yellow-400 h-3.5 w-3.5 fill-yellow-400" />
            <span className="ml-1">{destination.rating || 4.5}</span>
            <span className="mx-1">•</span>
            <span>{destination.category}</span>
          </div>
        </div>
        <Button
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={handleToggleFavorite}
        >
          <Heart 
            className={isFavorite ? "text-red-500 fill-red-500" : "text-gray-700"} 
            size={16} 
          />
        </Button>
      </div>
    </div>
  );
}

export default DestinationCard;
