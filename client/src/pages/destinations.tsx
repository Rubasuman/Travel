import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Sidebar from "@/components/ui/sidebar";
import MobileNav from "@/components/ui/mobile-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, MapPin, Search, Eye } from "lucide-react";
import { Link } from "wouter";
import AddTripForm from "@/components/trips/add-trip-form";

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<any>(null);
  const [isPlanTripDialogOpen, setIsPlanTripDialogOpen] = useState(false);

  const { data: destinations = [] } = useQuery({
    queryKey: ['/api/destinations'],
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handlePlanTrip = (destination: any) => {
    setSelectedDestination(destination);
    setIsPlanTripDialogOpen(true);
  };

  const handlePlanTripSuccess = () => {
    setIsPlanTripDialogOpen(false);
  };

  // Filter destinations based on search term and category
  const filteredDestinations = destinations.filter((destination: any) => {
    const matchesSearch = 
      destination.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      destination.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "" || 
      destination.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for the filter dropdown
  const categories = Array.from(
    new Set(destinations.map((d: any) => d.category))
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - Desktop */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 overflow-y-auto pb-16 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-heading">Explore Destinations</h1>
            <p className="text-gray-600 mt-2">Discover new places and plan your next adventure</p>
          </div>
          
          {/* Search and Filters */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search destinations..."
                className="pl-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Destinations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((destination: any) => (
              <Card key={destination.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={destination.imageUrl}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center">
                    <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                    <span>{destination.rating}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-bold">{destination.name}, {destination.country}</h3>
                    <div className="flex items-center text-white/90 text-xs mt-1">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{destination.category}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {destination.description}
                  </p>
                  <div className="flex gap-2">
                    <Link href={`/destinations/${destination.id}`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handlePlanTrip(destination)}
                      className="flex-1"
                    >
                      Plan a Trip
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {filteredDestinations.length === 0 && (
            <div className="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300 mt-8">
              <MapPin className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">No destinations found</h3>
              <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Plan Trip Dialog */}
      <Dialog open={isPlanTripDialogOpen} onOpenChange={setIsPlanTripDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDestination && `Plan a Trip to ${selectedDestination.name}`}
            </DialogTitle>
          </DialogHeader>
          <AddTripForm onSuccess={handlePlanTripSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
