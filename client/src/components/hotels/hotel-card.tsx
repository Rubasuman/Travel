import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Camera, ExternalLink, Phone, Wifi, Car, Utensils } from 'lucide-react';
import type { Hotel } from '@shared/schema';

interface HotelCardProps {
  hotel: Hotel;
  onViewDetails?: (hotel: Hotel) => void;
  onView360?: (hotel: Hotel) => void;
}

export function HotelCard({ hotel, onViewDetails, onView360 }: HotelCardProps) {
  const amenityIcons: Record<string, any> = {
    'Wifi': Wifi,
    'Parking': Car,
    'Restaurant': Utensils,
    'Spa': Star,
    'Pool': Star,
    'Fitness Center': Star,
    'Bar': Utensils,
  };

  const getAmenityIcon = (amenity: string) => {
    return amenityIcons[amenity] || Star;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {hotel.imageUrls && hotel.imageUrls.length > 0 && (
        <div className="aspect-video relative overflow-hidden">
          <img
            src={Array.isArray(hotel.imageUrls) ? hotel.imageUrls[0] : hotel.imageUrls}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          {hotel.virtual360Url && (
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2"
              onClick={() => onView360?.(hotel)}
            >
              <Camera className="w-4 h-4 mr-1" />
              360°
            </Button>
          )}
        </div>
      )}

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{hotel.name}</CardTitle>
          {hotel.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{hotel.rating}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{hotel.address}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {hotel.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {hotel.description}
          </p>
        )}

        {hotel.amenities && Array.isArray(hotel.amenities) && hotel.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {hotel.amenities.slice(0, 4).map((amenity) => {
              const IconComponent = getAmenityIcon(amenity);
              return (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  <IconComponent className="w-3 h-3 mr-1" />
                  {amenity}
                </Badge>
              );
            })}
            {hotel.amenities.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{hotel.amenities.length - 4} more
              </Badge>
            )}
          </div>
        )}

        {hotel.pricePerNight && (
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              ${hotel.pricePerNight}
              <span className="text-sm font-normal text-muted-foreground">/night</span>
            </span>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails?.(hotel)}
          >
            View Details
          </Button>
          
          {hotel.website && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(hotel.website, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}

          {hotel.phone && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`tel:${hotel.phone}`, '_self')}
            >
              <Phone className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}