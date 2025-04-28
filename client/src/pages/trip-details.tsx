import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-context";
import Sidebar from "@/components/ui/sidebar";
import MobileNav from "@/components/ui/mobile-nav";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import ItineraryForm from "@/components/trips/itinerary-form";
import { format, differenceInDays, addDays } from "date-fns";
import { CalendarRange, Pencil, Plus, Trash2, ChevronLeft, Globe, Map, Upload, FileText, MapPin } from "lucide-react";

interface TripDetailsProps {
  id: number;
}

export default function TripDetails({ id }: TripDetailsProps) {
  const [, setLocation] = useLocation();
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isItineraryDialogOpen, setIsItineraryDialogOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const { data: dbUser } = useQuery({
    queryKey: [`/api/users/uid/${user?.uid}`],
    enabled: !!user?.uid,
  });

  const { data: trip, isLoading: isTripLoading } = useQuery({
    queryKey: [`/api/trips/${id}`],
    enabled: !!id,
  });

  const { data: destination } = useQuery({
    queryKey: [`/api/destinations/${trip?.destinationId}`],
    enabled: !!trip?.destinationId,
  });

  const { data: itineraries = [] } = useQuery({
    queryKey: [`/api/trips/${id}/itineraries`],
    enabled: !!id,
  });

  const { data: photos = [] } = useQuery({
    queryKey: [`/api/trips/${id}/photos`],
    enabled: !!id,
  });

  // Ensure the user owns this trip
  useEffect(() => {
    if (trip && dbUser && trip.userId !== dbUser.id) {
      toast({
        title: "Access denied",
        description: "You don't have permission to view this trip",
        variant: "destructive",
      });
      setLocation("/trips");
    }
  }, [trip, dbUser, toast, setLocation]);

  if (isTripLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Trip not found</h2>
          <p className="text-gray-600 mb-4">The trip you are looking for doesn't exist or has been removed.</p>
          <Button onClick={() => setLocation("/trips")}>
            Back to Trips
          </Button>
        </div>
      </div>
    );
  }

  const tripDuration = differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1;
  
  // Generate days for the trip
  const tripDays = Array.from({ length: tripDuration }, (_, i) => {
    const day = addDays(new Date(trip.startDate), i);
    const dayNumber = i + 1;
    const formattedDate = format(day, "EEE, MMM d");
    
    const itinerary = itineraries.find((it: any) => it.day === dayNumber);
    
    return {
      day: dayNumber,
      date: day,
      formattedDate,
      itinerary,
    };
  });

  const handleDelete = async () => {
    try {
      await apiRequest("DELETE", `/api/trips/${id}`, {});
      toast({
        title: "Trip deleted",
        description: "Your trip has been successfully deleted",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${dbUser.id}/trips`] });
      setLocation("/trips");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete trip",
        variant: "destructive",
      });
    }
  };

  const handleAddItinerary = (day: number) => {
    setActiveDay(day);
    setIsItineraryDialogOpen(true);
  };

  const handleEditItinerary = (day: number) => {
    setActiveDay(day);
    setIsItineraryDialogOpen(true);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - Desktop */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 overflow-y-auto pb-16 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Back button */}
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => setLocation("/trips")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Trips
          </Button>
          
          {/* Trip Header */}
          <div className="relative rounded-xl overflow-hidden mb-6">
            <div className="h-48 md:h-64 bg-gray-200">
              <img
                src={trip.imageUrl || destination?.imageUrl}
                alt={trip.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <div className="inline-block bg-indigo-100 text-primary rounded-full px-3 py-1 text-xs font-medium mb-2">
                <CalendarRange className="inline-block mr-1 h-3.5 w-3.5" />
                {format(new Date(trip.startDate), "MMM d")} - {format(new Date(trip.endDate), "MMM d, yyyy")}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{trip.title}</h1>
              <p className="text-white/90 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                {destination?.name}, {destination?.country}
              </p>
            </div>
          </div>
          
          {/* Trip Actions */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Trip
            </Button>
            <Button variant="outline" className="text-red-500 hover:text-red-600" onClick={() => setIsDeleteDialogOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Trip
            </Button>
          </div>
          
          {/* Trip Content */}
          <Tabs defaultValue="itinerary">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="info">Trip Info</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>
            
            {/* Itinerary Tab */}
            <TabsContent value="itinerary">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Day Navigation */}
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trip Days</CardTitle>
                      <CardDescription>
                        {tripDuration} {tripDuration === 1 ? 'day' : 'days'} trip
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="max-h-[70vh] overflow-y-auto">
                        <div className="space-y-1 p-2">
                          {tripDays.map((tripDay) => (
                            <div
                              key={tripDay.day}
                              className={`px-3 py-2 rounded-md cursor-pointer flex items-center justify-between ${
                                tripDay.itinerary ? "bg-indigo-50" : "hover:bg-gray-100"
                              }`}
                              onClick={() => {
                                if (tripDay.itinerary) {
                                  handleEditItinerary(tripDay.day);
                                } else {
                                  handleAddItinerary(tripDay.day);
                                }
                              }}
                            >
                              <div>
                                <div className="font-medium">Day {tripDay.day}</div>
                                <div className="text-sm text-gray-500">{tripDay.formattedDate}</div>
                              </div>
                              {tripDay.itinerary ? (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* Itinerary Details */}
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Itinerary Details</CardTitle>
                      <CardDescription>
                        Click on a day to add or edit activities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {itineraries.length === 0 ? (
                        <div className="text-center p-12 border border-dashed rounded-lg">
                          <FileText className="mx-auto h-12 w-12 text-gray-400" />
                          <h3 className="mt-4 text-lg font-medium text-gray-900">No itinerary yet</h3>
                          <p className="mt-2 text-sm text-gray-500">Start planning your trip by adding activities for each day.</p>
                          <Button 
                            className="mt-4"
                            onClick={() => handleAddItinerary(1)}
                          >
                            <Plus className="mr-2 h-4 w-4" /> 
                            Plan Day 1
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {itineraries
                            .sort((a: any, b: any) => a.day - b.day)
                            .map((itinerary: any) => {
                              const tripDay = tripDays.find(d => d.day === itinerary.day);
                              return (
                                <div key={itinerary.id} className="border rounded-lg p-4">
                                  <div className="flex justify-between items-center mb-4">
                                    <div>
                                      <h3 className="font-bold text-lg">Day {itinerary.day}</h3>
                                      <p className="text-gray-500 text-sm">{tripDay?.formattedDate}</p>
                                    </div>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleEditItinerary(itinerary.day)}
                                    >
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    {itinerary.activities.map((activity: any, index: number) => (
                                      <div key={index} className="border-l-2 border-primary pl-4 py-1">
                                        <div className="font-medium">{activity.time} - {activity.title}</div>
                                        <div className="text-sm text-gray-600">{activity.description}</div>
                                        {activity.location && (
                                          <div className="text-xs text-gray-500 flex items-center mt-1">
                                            <MapPin className="h-3 w-3 mr-1" />
                                            {activity.location}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  
                                  {itinerary.notes && (
                                    <div className="mt-4 bg-gray-50 p-3 rounded-md">
                                      <h4 className="font-medium text-sm">Notes:</h4>
                                      <p className="text-sm text-gray-600">{itinerary.notes}</p>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Trip Info Tab */}
            <TabsContent value="info">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>About this trip</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 whitespace-pre-line">
                        {trip.description || `Explore the beautiful ${destination?.name} with this ${tripDuration}-day itinerary. Plan your activities and make the most of your trip!`}
                      </p>
                      
                      <div className="mt-8 space-y-4">
                        <div className="flex items-start">
                          <CalendarRange className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                          <div>
                            <h3 className="font-medium">Trip Dates</h3>
                            <p className="text-sm text-gray-600">
                              {format(new Date(trip.startDate), "MMMM d")} - {format(new Date(trip.endDate), "MMMM d, yyyy")}
                              <span className="text-gray-500 ml-2">({tripDuration} {tripDuration === 1 ? 'day' : 'days'})</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                          <div>
                            <h3 className="font-medium">Destination</h3>
                            <p className="text-sm text-gray-600">{destination?.name}, {destination?.country}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>Destination Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {destination?.description && (
                        <p className="text-sm text-gray-700">{destination.description}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Category</span>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                          {destination?.category || "Travel"}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Rating</span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                          <span className="ml-1 text-sm">{destination?.rating || 5}</span>
                        </span>
                      </div>
                      
                      <div className="pt-2">
                        <Button variant="outline" className="w-full" onClick={() => window.open(`https://www.google.com/maps/search/${destination?.name} ${destination?.country}`, '_blank')}>
                          <Globe className="mr-2 h-4 w-4" />
                          View on Maps
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Photos Tab */}
            <TabsContent value="photos">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Trip Photos</CardTitle>
                    <CardDescription>
                      Capture and save memories from your trip
                    </CardDescription>
                  </div>
                  <Button onClick={() => setLocation("/gallery")}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photos
                  </Button>
                </CardHeader>
                <CardContent>
                  {photos.length === 0 ? (
                    <div className="text-center p-12 border border-dashed rounded-lg">
                      <Images className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-4 text-lg font-medium text-gray-900">No photos yet</h3>
                      <p className="mt-2 text-sm text-gray-500">Upload photos to remember your journey.</p>
                      <Button 
                        className="mt-4"
                        onClick={() => setLocation("/gallery")}
                      >
                        <Upload className="mr-2 h-4 w-4" /> 
                        Upload Your First Photo
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {photos.map((photo: any) => (
                        <div key={photo.id} className="relative rounded-lg overflow-hidden aspect-square group">
                          <img 
                            src={photo.imageUrl} 
                            alt={photo.caption || "Travel memory"} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                            {photo.caption && (
                              <div className="text-white text-center p-2">
                                <p className="text-sm font-medium">{photo.caption}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Itinerary Dialog */}
      <Dialog open={isItineraryDialogOpen} onOpenChange={setIsItineraryDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {tripDays.find(d => d.day === activeDay)?.itinerary 
                ? `Edit Day ${activeDay} Itinerary` 
                : `Add Day ${activeDay} Itinerary`}
            </DialogTitle>
            <DialogDescription>
              {format(
                tripDays.find(d => d.day === activeDay)?.date || new Date(), 
                "EEEE, MMMM d, yyyy"
              )}
            </DialogDescription>
          </DialogHeader>
          
          {activeDay && (
            <ItineraryForm 
              tripId={id} 
              day={activeDay} 
              date={tripDays.find(d => d.day === activeDay)?.date || new Date()}
              existingItinerary={tripDays.find(d => d.day === activeDay)?.itinerary}
              onSuccess={() => setIsItineraryDialogOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Trip Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your trip
              and all associated itineraries and data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
