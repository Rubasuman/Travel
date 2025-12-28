import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-context";
import type { User } from '@shared/schema';
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/ui/sidebar";
import { TopHeader } from "@/components/ui/sidebar";
import MobileNav from "@/components/ui/mobile-nav";
import StatsCard from "@/components/dashboard/stats-card";
import TripCard from "@/components/dashboard/trip-card";
import DestinationCard from "@/components/dashboard/destination-card";
import NotificationItem from "@/components/dashboard/notification-item";
import PhotoGallery from "@/components/dashboard/photo-gallery";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddTripForm from "@/components/trips/add-trip-form";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Image, Plus } from "lucide-react";
import { differenceInDays } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isAddTripDialogOpen, setIsAddTripDialogOpen] = useState(false);
  const [isFavoritesDialogOpen, setIsFavoritesDialogOpen] = useState(false);
  const [favoriteDestinationIds, setFavoriteDestinationIds] = useState<number[]>([]);
  const { user, userId } = useAuthContext();
  const { toast } = useToast();

  // Load favorite destinations from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('favorite_destinations');
      if (stored) setFavoriteDestinationIds(JSON.parse(stored));
    } catch (e) {
      console.warn('Failed to load favorite destinations', e);
    }
  }, []);

  const persistFavoriteDestinations = (ids: number[]) => {
    try {
      localStorage.setItem('favorite_destinations', JSON.stringify(ids));
    } catch (e) {
      console.warn('Failed to persist favorite destinations', e);
    }
  };

  const handleToggleFavoriteDestination = (destinationId: number) => {
    setFavoriteDestinationIds((prev) => {
      const exists = prev.includes(destinationId);
      const next = exists ? prev.filter(id => id !== destinationId) : [...prev, destinationId];
      persistFavoriteDestinations(next);
      toast({
        title: exists ? 'Removed from favorites' : 'Added to favorites',
        variant: 'default',
      });
      return next;
    });
  };

  const { data: dbUser } = useQuery<User | null>({
    queryKey: [`/api/users/uid/${user?.uid}`],
    enabled: !!user?.uid,
  });

  const { data: trips = [] } = useQuery<any>({
    queryKey: [`/api/users/${dbUser?.id}/trips`],
    enabled: !!dbUser?.id,
  });

  const { data: destinations = [] } = useQuery<any>({
    queryKey: ['/api/destinations'],
  });

  const { data: notifications = [] } = useQuery<any>({
    queryKey: [`/api/users/${dbUser?.id}/notifications`],
    enabled: !!dbUser?.id,
  });

  const { data: photos = [] } = useQuery<any>({
    queryKey: [`/api/users/${dbUser?.id}/photos`],
    enabled: !!dbUser?.id,
  });

  const favoriteTrips = (trips || []).filter((t: any) => t.isFavorite);
  const favoriteDestinations = (destinations || []).filter((d: any) => favoriteDestinationIds.includes(d.id));

  // Helper function to get destination info for a trip
  const getDestinationForTrip = (destinationId: number) => {
    return destinations.find((d: any) => d.id === destinationId) || { 
      name: "Unknown", 
      country: "Location",
      imageUrl: ""
    };
  };

  // Calculate days until next trip
  const calculateDaysUntilNextTrip = (): number => {
    if (!trips || trips.length === 0) return 0;
    
    const sortedTrips = [...trips].sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    
    const upcomingTrips = sortedTrips.filter(trip => 
      new Date(trip.startDate) > new Date()
    );
    
    if (upcomingTrips.length === 0) return 0;
    
    const nextTrip = upcomingTrips[0];
    return differenceInDays(new Date(nextTrip.startDate), new Date());
  };

  const handleAddTrip = () => {
    setIsAddTripDialogOpen(true);
  };

  const handleAddTripSuccess = () => {
    setIsAddTripDialogOpen(false);
    toast({
      title: "Trip created successfully",
      description: "Your new trip has been added to your itinerary",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Header - Desktop */}
      <TopHeader />
      
      {/* Sidebar - Desktop Bottom Navigation */}
      <Sidebar />
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-20">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold font-heading text-primary">Wanderlust</h1>
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-600 focus:outline-none"
          >
            {showMobileMenu ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-10 bg-black bg-opacity-50">
          <div className="bg-white w-64 h-full overflow-y-auto">
            <div className="p-5 border-b border-gray-200 flex justify-between items-center">
              <h1 className="text-xl font-bold font-heading text-primary">Wanderlust</h1>
              <button 
                onClick={() => setShowMobileMenu(false)}
                className="text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="p-4 space-y-1">
              <Link href="/">
                <a className="flex items-center px-4 py-3 text-gray-800 bg-indigo-50 rounded-lg">
                  <span className="text-primary w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </span>
                  <span className="ml-3 font-medium">Dashboard</span>
                </a>
              </Link>
              <Link href="/destinations">
                <a className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <span className="text-gray-500 w-5">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <span className="ml-3">Destinations</span>
                </a>
              </Link>
              <Link href="/trips">
                <a className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <span className="text-gray-500 w-5">
                    <Calendar className="h-5 w-5" />
                  </span>
                  <span className="ml-3">Itineraries</span>
                </a>
              </Link>
              <Link href="/gallery">
                <a className="flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <span className="text-gray-500 w-5">
                    <Image className="h-5 w-5" />
                  </span>
                  <span className="ml-3">Travel Gallery</span>
                </a>
              </Link>
            </nav>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-16 overflow-y-auto pb-32 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-heading">
              Welcome back, <span>{user?.displayName?.split(' ')[0] || "Traveler"}</span>!
            </h2>
            <p className="text-gray-600 mt-1">Your next adventure awaits.</p>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard 
              icon={<MapPin />} 
              value={trips?.length || 0} 
              label="Planned Trips" 
              iconClassName="text-primary"
              iconBgClassName="bg-indigo-100"
            />
            
            <StatsCard 
              icon={<Calendar />} 
              value={`${calculateDaysUntilNextTrip()} days`} 
              label="Until Next Trip" 
              iconClassName="text-secondary"
              iconBgClassName="bg-blue-100"
            />
            
            <StatsCard 
              icon={<Image />} 
              value={photos?.length || 0} 
              label="Saved Photos" 
              iconClassName="text-accent"
              iconBgClassName="bg-amber-100"
            />
          </div>
          
          {/* Upcoming Trips Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-heading">Your Upcoming Trips</h2>
              <Link href="/trips">
                <a className="text-primary hover:text-indigo-700 font-medium text-sm flex items-center">
                  <span>View all</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
            
            {trips && trips.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trips.slice(0, 3).map((trip: any) => {
                  const destination = getDestinationForTrip(trip.destinationId);
                  return (
                    <TripCard 
                      key={trip.id} 
                      trip={trip} 
                      destinationName={destination.name} 
                      destinationCountry={destination.country}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No trips planned yet</h3>
                <p className="mt-2 text-sm text-gray-500">Get started by creating your first trip itinerary.</p>
              </div>
            )}
            
            {/* Add New Trip Button */}
            <Button 
              variant="outline" 
              className="mt-6 w-full md:w-auto border-dashed"
              onClick={handleAddTrip}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>Plan a new trip</span>
            </Button>
          </div>
          
          {/* Discover Destinations Section */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-heading">Discover Destinations</h2>
              <Link href="/destinations">
                <a className="text-primary hover:text-indigo-700 font-medium text-sm flex items-center">
                  <span>Explore all</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
            
            <div className="relative">
              <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
                {destinations.map((destination: any) => (
                  <Link key={destination.id} href={`/destinations/${destination.id}`}>
                    <a className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white rounded-xl">
                      <DestinationCard
                        destination={destination}
                        isFavorite={favoriteDestinationIds.includes(destination.id)}
                        onToggleFavorite={() => handleToggleFavoriteDestination(destination.id)}
                      />
                    </a>
                  </Link>
                ))}
              </div>
              
              {/* Scroll buttons */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full w-8 h-8 shadow-md text-gray-600 hover:text-primary"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full w-8 h-8 shadow-md text-gray-600 hover:text-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Recent Notifications & Travel Gallery Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Notifications */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold font-heading">Notifications</h2>
                  <span className="bg-indigo-100 text-primary text-xs font-medium px-2 py-1 rounded-full">
                    {notifications.filter((n: any) => !n.isRead).length} new
                  </span>
                </div>
                
                {notifications && notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map((notification: any) => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification} 
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No notifications yet</p>
                  </div>
                )}
                
                <Link href="/notifications">
                  <a className="w-full text-center text-primary text-sm font-medium mt-4 block">
                    View all notifications
                  </a>
                </Link>
              </div>

              {/* Favorites */}
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold font-heading">Favorites</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary"
                    onClick={() => setIsFavoritesDialogOpen(true)}
                    disabled={favoriteTrips.length === 0 && favoriteDestinations.length === 0}
                  >
                    View
                  </Button>
                </div>

                {favoriteTrips.length === 0 && favoriteDestinations.length === 0 ? (
                  <p className="text-sm text-gray-500">No favorites yet.</p>
                ) : (
                  <p className="text-sm text-gray-700">{favoriteTrips.length + favoriteDestinations.length} favorites saved. Click View to see them.</p>
                )}
              </div>
            </div>
            
            {/* Travel Gallery */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold font-heading">Your Travel Gallery</h2>
                  <Link href="/gallery">
                    <a className="text-primary hover:text-indigo-700 text-sm font-medium">
                      Upload Photos
                    </a>
                  </Link>
                </div>
                
                {photos && photos.length > 0 ? (
                  <PhotoGallery photos={photos} userId={dbUser?.id} />
                ) : (
                  <div className="text-center py-12">
                    <Image className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">No photos yet</h3>
                    <p className="mt-2 text-sm text-gray-500">Upload your travel memories to your gallery.</p>
                    <Link href="/gallery">
                      <a className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-indigo-600">
                        Upload your first photo
                      </a>
                    </Link>
                  </div>
                )}
                
                {photos && photos.length > 0 && (
                  <Link href="/gallery">
                    <a className="w-full text-center text-primary text-sm font-medium mt-4 block">
                      View all photos
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Add Trip Dialog */}
      <Dialog open={isAddTripDialogOpen} onOpenChange={setIsAddTripDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Plan a New Trip</DialogTitle>
          </DialogHeader>
          <AddTripForm onSuccess={handleAddTripSuccess} />
        </DialogContent>
      </Dialog>

      {/* Favorites Dialog */}
      <Dialog open={isFavoritesDialogOpen} onOpenChange={setIsFavoritesDialogOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Your Favorites</DialogTitle>
          </DialogHeader>

          {favoriteTrips.length === 0 && favoriteDestinations.length === 0 ? (
            <p className="text-sm text-gray-500">No favorites yet.</p>
          ) : (
            <div className="space-y-5">
              {favoriteTrips.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Trips</h3>
                  <div className="space-y-2">
                    {favoriteTrips.map((trip: any) => (
                      <Link key={trip.id} href={`/trips/${trip.id}`}>
                        <a className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 hover:bg-gray-50">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{trip.title}</p>
                            <p className="text-xs text-gray-500">{getDestinationForTrip(trip.destinationId)?.name}</p>
                          </div>
                          <span className="text-xs text-primary font-semibold">View</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {favoriteDestinations.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Destinations</h3>
                  <div className="space-y-2">
                    {favoriteDestinations.map((destination: any) => (
                      <Link key={destination.id} href={`/destinations/${destination.id}`}>
                        <a className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2 hover:bg-gray-50">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{destination.name}</p>
                            <p className="text-xs text-gray-500">{destination.country}</p>
                          </div>
                          <span className="text-xs text-primary font-semibold">View</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
