import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Camera, ExternalLink, Phone, Clock } from 'lucide-react';
import type { Place } from '@shared/schema';

interface PlaceCardProps {
  place: Place;
  onViewDetails?: (place: Place) => void;
  onView360?: (place: Place) => void;
}

export function PlaceCard({ place, onViewDetails, onView360 }: PlaceCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Restaurant': 'bg-orange-100 text-orange-800',
      'Attraction': 'bg-blue-100 text-blue-800',
      'Museum': 'bg-purple-100 text-purple-800',
      'Shopping': 'bg-green-100 text-green-800',
      'Temple': 'bg-yellow-100 text-yellow-800',
      'Park': 'bg-emerald-100 text-emerald-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getTodaysHours = () => {
    if (!place.openingHours || typeof place.openingHours !== 'object') return null;
    
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    const hours = place.openingHours as Record<string, string>;
    
    return hours[today] || null;
  };

  const todaysHours = getTodaysHours();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {Array.isArray(place.imageUrls) && place.imageUrls.length > 0 ? (
        <div className="aspect-video relative overflow-hidden">
          <img
            src={(place.imageUrls[0] as string) ?? undefined}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          {place.virtual360Url && (
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-2 right-2"
              onClick={() => onView360?.(place)}
            >
              <Camera className="w-4 h-4 mr-1" />
              360°
            </Button>
          )}
        </div>
      ) : null}

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{place.name}</CardTitle>
          {place.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{place.rating}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Badge className={getCategoryColor(place.category)}>
            {place.category}
          </Badge>
          {place.priceRange && (
            <Badge variant="outline">
              {place.priceRange}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{place.address}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {place.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {place.description}
          </p>
        )}

        {todaysHours && (
          <div className="flex items-center gap-1 text-sm">
            <Clock className="w-4 h-4" />
            <span>Today: {todaysHours}</span>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="default" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails?.(place)}
          >
            View Details
          </Button>
          
          {place.website && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(place.website ?? undefined as any, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          )}

          {place.phone && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`tel:${place.phone}`, '_self')}
            >
              <Phone className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}