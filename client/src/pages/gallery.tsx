import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-context";
import Sidebar from "@/components/ui/sidebar";
import MobileNav from "@/components/ui/mobile-nav";
import PhotoGallery from "@/components/dashboard/photo-gallery";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud } from "lucide-react";
import UploadPhotoForm from "@/components/gallery/upload-photo-form";

export default function Gallery() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<string>("");
  const { user } = useAuthContext();

  const { data: dbUser } = useQuery({
    queryKey: [`/api/users/uid/${user?.uid}`],
    enabled: !!user?.uid,
  });

  const { data: photos = [] } = useQuery({
    queryKey: [`/api/users/${dbUser?.id}/photos`],
    enabled: !!dbUser?.id,
  });

  const { data: trips = [] } = useQuery({
    queryKey: [`/api/users/${dbUser?.id}/trips`],
    enabled: !!dbUser?.id,
  });

  const filteredPhotos = selectedTrip 
    ? photos.filter((photo: any) => photo.tripId === parseInt(selectedTrip))
    : photos;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - Desktop */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 mt-16 lg:mt-0 overflow-y-auto pb-16 lg:pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold font-heading">Travel Gallery</h1>
              <p className="text-gray-600 mt-1">Store and manage your travel memories</p>
            </div>
            <Button 
              className="mt-4 md:mt-0"
              onClick={() => setIsUploadDialogOpen(true)}
            >
              <UploadCloud className="mr-2 h-4 w-4" /> 
              Upload Photo
            </Button>
          </div>
          
          <Tabs defaultValue="all">
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Photos</TabsTrigger>
                <TabsTrigger value="trips">By Trip</TabsTrigger>
              </TabsList>
              
              <div className="mt-4 md:mt-0">
                {trips.length > 0 && (
                  <Select value={selectedTrip} onValueChange={setSelectedTrip}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by trip" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Trips</SelectItem>
                      {trips.map((trip: any) => (
                        <SelectItem key={trip.id} value={trip.id.toString()}>
                          {trip.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
            
            <TabsContent value="all" className="mt-0">
              {photos.length === 0 ? (
                <div className="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No photos yet</h3>
                  <p className="mt-2 text-sm text-gray-500">Upload your travel memories to your gallery.</p>
                  <Button 
                    className="mt-4"
                    onClick={() => setIsUploadDialogOpen(true)}
                  >
                    <UploadCloud className="mr-2 h-4 w-4" /> 
                    Upload Your First Photo
                  </Button>
                </div>
              ) : filteredPhotos.length === 0 ? (
                <div className="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <h3 className="text-lg font-medium text-gray-900">No photos found for this trip</h3>
                  <p className="mt-2 text-sm text-gray-500">Try selecting a different trip or upload new photos.</p>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <PhotoGallery photos={filteredPhotos} userId={dbUser?.id} />
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="trips" className="mt-0">
              {trips.length === 0 ? (
                <div className="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <h3 className="text-lg font-medium text-gray-900">No trips created yet</h3>
                  <p className="mt-2 text-sm text-gray-500">Create a trip first to organize your photos by trip.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trips.map((trip: any) => {
                    const tripPhotos = photos.filter((photo: any) => photo.tripId === trip.id);
                    const coverPhoto = tripPhotos[0]?.imageUrl || trip.imageUrl;
                    
                    return (
                      <div key={trip.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="h-40 bg-gray-200">
                          {coverPhoto ? (
                            <img
                              src={coverPhoto}
                              alt={trip.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                              No photos
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold">{trip.title}</h3>
                          <p className="text-sm text-gray-500 mb-3">{tripPhotos.length} photos</p>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setSelectedTrip(trip.id.toString())}
                          >
                            View Photos
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Upload Photo Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload a Photo</DialogTitle>
          </DialogHeader>
          <UploadPhotoForm 
            userId={dbUser?.id} 
            trips={trips}
            onSuccess={() => setIsUploadDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
