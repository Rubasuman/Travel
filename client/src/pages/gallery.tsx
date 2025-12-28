import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/context/auth-context";
import type { User } from '@shared/schema';
import { supabase } from "@/lib/supabase";
import Sidebar from "@/components/ui/sidebar";
import { TopHeader } from "@/components/ui/sidebar";
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
import { ArrowLeft } from 'lucide-react';
import UploadPhotoForm from "@/components/gallery/upload-photo-form";

// Helper to get viewable URL from storage path
const getPhotoUrl = (imageUrl: string): string => {
  if (!imageUrl) return "";
  // If it's a full URL already, return as-is
  if (imageUrl.startsWith('http')) return imageUrl;
  // If it's a storage path like "photos/123/...", get the public URL
  if (imageUrl.includes('/')) {
    const [bucket, ...rest] = imageUrl.split('/');
    const filePath = rest.join('/');
    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data?.publicUrl || imageUrl;
  }
  return imageUrl;
};

export default function Gallery() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<string>("all");
  // controlled tab state so we can switch to the photos tab programmatically
  const [activeTab, setActiveTab] = useState<string>("all");
  const { user } = useAuthContext();

  const { data: dbUser } = useQuery<User | null>({
    queryKey: [`/api/users/uid/${user?.uid}`],
    enabled: !!user?.uid,
  });

  const { data: photos = [] } = useQuery<any>({
    queryKey: [`/api/users/${dbUser?.id}/photos`],
    enabled: !!dbUser?.id,
  });

  const { data: trips = [] } = useQuery<any>({
    queryKey: [`/api/users/${dbUser?.id}/trips`],
    enabled: !!dbUser?.id,
  });

  const filteredPhotos = selectedTrip && selectedTrip !== "all"
    ? photos.filter((photo: any) => photo.tripId === parseInt(selectedTrip))
    : photos;

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

          {/* My Trips - horizontal scrollable strip for discovery */}
          {trips.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">My Trips</h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {trips.map((trip: any) => {
                  const tripPhotos = photos.filter((photo: any) => photo.tripId === trip.id);
                  const photoUrl = tripPhotos.length > 0 ? getPhotoUrl(tripPhotos[0].imageUrl) : null;
                  const coverPhoto = photoUrl || trip.imageUrl;
                  return (
                    <div key={trip.id} className="w-64 flex-shrink-0 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                      <div className="h-36 bg-gray-200">
                        {coverPhoto ? (
                          <img src={coverPhoto} alt={trip.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">No photos</div>
                        )}
                      </div>
                      <div className="p-3">
                        <h4 className="font-bold truncate">{trip.title}</h4>
                        <p className="text-xs text-gray-500 mb-3">{tripPhotos.length} photos</p>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => { setSelectedTrip(trip.id.toString()); setActiveTab('all'); }}>
                          View Photos
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v)}>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Photos</TabsTrigger>
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
              {/* show selected trip name when a trip is selected */}
              {selectedTrip && selectedTrip !== 'all' && (
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{trips.find((t: any) => t.id.toString() === selectedTrip)?.title || 'Selected Trip'}</h2>
                  <div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedTrip('all')}>
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
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
            
            {/* 'By Trip' tab removed — trip cards are accessible via the Select and the selected trip's photos are shown above */}
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
            username={dbUser?.username}
            trips={trips}
            onSuccess={() => setIsUploadDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
