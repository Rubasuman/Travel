import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Camera, ExternalLink } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  type: 'destination' | 'hotel' | 'place';
  rating?: string;
  description?: string;
  imageUrl?: string;
  virtual360Url?: string;
  website?: string;
  category?: string;
  priceRange?: string;
}

interface InteractiveMapProps {
  locations: Location[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  onLocationClick?: (location: Location) => void;
}

export function InteractiveMap({ 
  locations, 
  center = { lat: 48.8566, lng: 2.3522 }, 
  zoom = 10,
  height = "400px",
  onLocationClick 
}: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <Card className="h-[400px] flex items-center justify-center">
        <CardContent>
          <p className="text-muted-foreground">
            Google Maps API key not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your environment.
          </p>
        </CardContent>
      </Card>
    );
  }

  const getMarkerColor = (type: string) => {
    switch (type) {
      case 'destination': return '#3B82F6'; // blue
      case 'hotel': return '#10B981'; // green
      case 'place': return '#F59E0B'; // orange
      default: return '#6B7280'; // gray
    }
  };

  const handleMarkerClick = (location: Location) => {
    setSelectedLocation(location);
    onLocationClick?.(location);
  };

  return (
    <div className="w-full" style={{ height }}>
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={false}
          className="w-full h-full rounded-lg"
        >
          {locations.map((location) => (
            <Marker
              key={`${location.type}-${location.id}`}
              position={{
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude)
              }}
              onClick={() => handleMarkerClick(location)}
              title={location.name}
            />
          ))}

          {selectedLocation && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedLocation.latitude),
                lng: parseFloat(selectedLocation.longitude)
              }}
              onCloseClick={() => setSelectedLocation(null)}
            >
              <div className="p-2 max-w-xs">
                <div className="flex items-start gap-2 mb-2">
                  <MapPin 
                    className="w-4 h-4 mt-1 flex-shrink-0" 
                    style={{ color: getMarkerColor(selectedLocation.type) }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{selectedLocation.name}</h3>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {selectedLocation.type}
                    </Badge>
                  </div>
                </div>

                {selectedLocation.rating && (
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs">{selectedLocation.rating}</span>
                  </div>
                )}

                {selectedLocation.category && (
                  <Badge variant="outline" className="text-xs mb-2">
                    {selectedLocation.category}
                  </Badge>
                )}

                {selectedLocation.priceRange && (
                  <Badge variant="outline" className="text-xs mb-2 ml-1">
                    {selectedLocation.priceRange}
                  </Badge>
                )}

                {selectedLocation.description && (
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {selectedLocation.description}
                  </p>
                )}

                <div className="flex gap-1">
                  {selectedLocation.virtual360Url && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs p-1 h-6"
                      onClick={() => window.open(selectedLocation.virtual360Url, '_blank')}
                    >
                      <Camera className="w-3 h-3" />
                      360°
                    </Button>
                  )}
                  
                  {selectedLocation.website && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs p-1 h-6"
                      onClick={() => window.open(selectedLocation.website, '_blank')}
                    >
                      <ExternalLink className="w-3 h-3" />
                      Visit
                    </Button>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  );
}