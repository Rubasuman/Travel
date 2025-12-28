import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import type { Place } from '@shared/schema';

interface PlaceDetailsModalProps {
  place: Place | null;
  onClose: () => void;
}

export function PlaceDetailsModal({ place, onClose }: PlaceDetailsModalProps) {
  if (!place) {
    return null;
  }

  const imageUrls = (place.imageUrls || []) as string[];
  const openingHours = (place.openingHours || {}) as Record<string, unknown>;

  return (
    <Dialog open={!!place} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{String(place.name)}</DialogTitle>
        </DialogHeader>
        
        {imageUrls.length > 0 && (
          <div className="space-y-2">
            <img
              src={imageUrls[0]}
              alt={String(place.name)}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        <div className="space-y-6">
          {/* Rating, Category, and Price Range */}
          <div className="space-y-2">
            <div className="flex items-center gap-4 flex-wrap">
              {place.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{String(place.rating)}</span>
                </div>
              )}
              {place.category && (
                <Badge variant="secondary">{String(place.category)}</Badge>
              )}
              {place.priceRange && (
                <span className="font-semibold text-primary">{String(place.priceRange)}</span>
              )}
            </div>
            
            {place.address && (
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{String(place.address)}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {place.description && (
            <div>
              <h3 className="font-semibold text-lg mb-2">About</h3>
              <p className="text-gray-700">{String(place.description)}</p>
            </div>
          )}

          {/* Opening Hours */}
          {Object.keys(openingHours).length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Opening Hours</h3>
              <div className="space-y-1">
                {Object.entries(openingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="font-medium capitalize">{day}:</span>
                    <span className="text-gray-600">{String(hours)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Website Link */}
          {place.website && (
            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg mb-3">More Information</h3>
              <a 
                href={String(place.website)}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline flex items-center gap-2"
              >
                Visit Website
                <span>→</span>
              </a>
            </div>
          )}

          {/* Close Button */}
          <div className="flex gap-2 pt-4 border-t">
            <Button 
              onClick={onClose}
              className="flex-1"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
