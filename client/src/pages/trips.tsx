import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-context";
import Sidebar from "@/components/ui/sidebar";
import { TopHeader } from "@/components/ui/sidebar";
import MobileNav from "@/components/ui/mobile-nav";
import TripCard from "@/components/dashboard/trip-card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus, Search, Calendar } from "lucide-react";
import AddTripForm from "@/components/trips/add-trip-form";
import { format, compareDesc } from "date-fns";

export default function Trips() {
  const [isAddTripDialogOpen, setIsAddTripDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("upcoming");
  const { user } = useAuthContext();

  const { data: dbUser } = useQuery({
    queryKey: [`/api/users/uid/${user?.uid}`],
    enabled: !!user?.uid,
  });

  const { data: trips = [] } = useQuery<any>({
    queryKey: [`/api/users/${dbUser?.id}/trips`],
    enabled: !!dbUser?.id,
  });

  const { data: destinations = [] } = useQuery({
    queryKey: ['/api/destinations'],
  });

  // Get destination info for a trip
  const getDestinationForTrip = (destinationId: number) => {
    return destinations?.find((d: any) => d.id === destinationId) || {
      name: "Unknown",
      country: "Location",
      imageUrl: ""
    };
  };

  // Filter and sort trips
  const filteredTrips = trips.filter((trip: any) => {
    const destination = getDestinationForTrip(trip.destinationId);
    const searchLower = searchTerm.toLowerCase();
    
    return (
      trip.title.toLowerCase().includes(searchLower) ||
      destination.name.toLowerCase().includes(searchLower) ||
      destination.country.toLowerCase().includes(searchLower)
    );
  });

  const sortedTrips = [...filteredTrips].sort((a: any, b: any) => {
    if (sortOrder === "upcoming") {
      return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    } else if (sortOrder === "recent") {
      return compareDesc(new Date(a.startDate), new Date(b.startDate));
    } else if (sortOrder === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Group trips by month if sorting by date
  const groupedTrips = sortedTrips.reduce((groups: any, trip: any) => {
    if (sortOrder === "alphabetical") {
      return { ...groups, all: [...(groups.all || []), trip] };
    }
    
    const monthYear = format(new Date(trip.startDate), "MMMM yyyy");
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(trip);
    return groups;
  }, {});

  const handleAddTripSuccess = () => {
    setIsAddTripDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Header - Desktop */}
      <TopHeader />
      
      {/* Sidebar - Desktop Bottom Navigation */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-16 overflow-y-auto pb-32 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-heading">Your Trips</h1>
              <p className="text-gray-600 mt-1">Manage your travel itineraries</p>
            </div>
            <Button 
              className="mt-4 md:mt-0"
              onClick={() => setIsAddTripDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> 
              Create New Trip
            </Button>
          </div>
          
          {/* Filters and Search */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search trips..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming first</SelectItem>
                  <SelectItem value="recent">Recent first</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Trip List */}
          {trips.length === 0 ? (
            <div className="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No trips planned yet</h3>
              <p className="mt-2 text-sm text-gray-500">Get started by creating your first trip itinerary.</p>
              <Button 
                className="mt-4"
                onClick={() => setIsAddTripDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" /> 
                Create Your First Trip
              </Button>
            </div>
          ) : filteredTrips.length === 0 ? (
            <div className="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No matching trips found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedTrips).map(([group, groupTrips]: [string, any]) => (
                <div key={group}>
                  {group !== "all" && (
                    <h2 className="text-xl font-semibold mb-4">{group}</h2>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupTrips.map((trip: any) => {
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
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Add Trip Dialog */}
      <Dialog open={isAddTripDialogOpen} onOpenChange={setIsAddTripDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create a New Trip</DialogTitle>
          </DialogHeader>
          <AddTripForm onSuccess={handleAddTripSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
