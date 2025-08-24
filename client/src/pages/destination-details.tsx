import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, MapPin, Camera, ArrowLeft } from 'lucide-react';
import { InteractiveMap } from '@/components/maps/interactive-map';
import { HotelCard } from '@/components/hotels/hotel-card';
import { PlaceCard } from '@/components/places/place-card';
import { ReviewCard } from '@/components/reviews/review-card';
import { AddReviewForm } from '@/components/reviews/add-review-form';
import { useAuthContext } from '@/context/auth-context';
import type { Destination, Hotel, Place, Review, User } from '@shared/schema';

export default function DestinationDetails() {
  const params = useParams();
  const destinationId = parseInt(params.id!);
  const { user, userId } = useAuthContext();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showAddReview, setShowAddReview] = useState(false);
  const [show360View, setShow360View] = useState<string | null>(null);

  // Fetch destination details
  const { data: destination } = useQuery<Destination>({
    queryKey: ['/api/destinations', destinationId],
    queryFn: () => fetch(`/api/destinations/${destinationId}`).then(res => res.json()),
  });

  // Fetch hotels
  const { data: hotels = [] } = useQuery<Hotel[]>({
    queryKey: ['/api/destinations', destinationId, 'hotels'],
    queryFn: () => fetch(`/api/destinations/${destinationId}/hotels`).then(res => res.json()),
    enabled: !!destinationId,
  });

  // Fetch places
  const { data: places = [] } = useQuery<Place[]>({
    queryKey: ['/api/destinations', destinationId, 'places'],
    queryFn: () => fetch(`/api/destinations/${destinationId}/places`).then(res => res.json()),
    enabled: !!destinationId,
  });

  // Fetch reviews for hotels and places
  const { data: reviews = [] } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
    queryFn: () => fetch('/api/reviews').then(res => res.json()),
  });

  if (!destination) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading destination details...</div>
      </div>
    );
  }

  // Prepare map locations
  const mapLocations = [
    ...(destination.latitude && destination.longitude ? [{
      id: destination.id,
      name: destination.name,
      latitude: destination.latitude,
      longitude: destination.longitude,
      type: 'destination' as const,
      rating: destination.rating,
      description: destination.description,
      category: destination.category,
    }] : []),
    ...hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      type: 'hotel' as const,
      rating: hotel.rating,
      description: hotel.description,
      virtual360Url: hotel.virtual360Url,
      website: hotel.website,
    })),
    ...places.map(place => ({
      id: place.id,
      name: place.name,
      latitude: place.latitude,
      longitude: place.longitude,
      type: 'place' as const,
      rating: place.rating,
      description: place.description,
      category: place.category,
      virtual360Url: place.virtual360Url,
      website: place.website,
      priceRange: place.priceRange,
    })),
  ];

  const mapCenter = destination.latitude && destination.longitude 
    ? { lat: parseFloat(destination.latitude), lng: parseFloat(destination.longitude) }
    : { lat: 48.8566, lng: 2.3522 };

  const handle360View = (url: string) => {
    setShow360View(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        {destination.imageUrl && (
          <img
            src={destination.imageUrl}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8 text-white">
            <Button
              variant="secondary"
              size="sm"
              className="mb-4"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                <span>{destination.city}, {destination.country}</span>
              </div>
              {destination.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>{destination.rating}</span>
                </div>
              )}
              {destination.category && (
                <Badge variant="secondary">{destination.category}</Badge>
              )}
            </div>
            {destination.description && (
              <p className="text-lg max-w-2xl">{destination.description}</p>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Interactive Map */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Explore Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <InteractiveMap
              locations={mapLocations}
              center={mapCenter}
              height="400px"
              onLocationClick={setSelectedItem}
            />
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs defaultValue="hotels" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hotels">Hotels ({hotels.length})</TabsTrigger>
            <TabsTrigger value="places">Places ({places.length})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Hotels & Accommodation</h2>
            </div>
            
            {hotels.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No hotels available for this destination yet.
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    onViewDetails={setSelectedItem}
                    onView360={(hotel) => hotel.virtual360Url && handle360View(hotel.virtual360Url)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="places" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Places to Visit</h2>
            </div>
            
            {places.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No places available for this destination yet.
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {places.map((place) => (
                  <PlaceCard
                    key={place.id}
                    place={place}
                    onViewDetails={setSelectedItem}
                    onView360={(place) => place.virtual360Url && handle360View(place.virtual360Url)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Reviews & Experiences</h2>
              {userId && (
                <Button onClick={() => setShowAddReview(true)}>
                  Write a Review
                </Button>
              )}
            </div>

            {showAddReview && userId && (
              <AddReviewForm
                userId={userId}
                onSuccess={() => setShowAddReview(false)}
              />
            )}
            
            {reviews.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No reviews yet. Be the first to share your experience!
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onView360={(review) => review.virtual360Url && handle360View(review.virtual360Url)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* 360° View Modal */}
      <Dialog open={!!show360View} onOpenChange={() => setShow360View(null)}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              360° Experience
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1">
            {show360View && (
              <iframe
                src={show360View}
                className="w-full h-full rounded-lg"
                allowFullScreen
                title="360° View"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}