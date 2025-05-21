import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, MapPin, Globe, Search, Filter, Heart, Plus, Star, ExternalLink, Flag } from 'lucide-react';

export default function DestinationsSnapshot() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-6">
        <Link href="/ui-snapshots">
          <Button variant="outline" className="flex items-center gap-2 bg-black border-red-700 text-white hover:bg-red-900/20">
            <ArrowLeft size={16} />
            Back to Snapshots
          </Button>
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-2 red-gradient-text">User Interface Snapshots</h1>
        <h2 className="text-xl text-gray-400 mb-8">8.4 Destinations</h2>
      </div>
      
      {/* Destinations Interface */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-xl border border-red-900 overflow-hidden shadow-xl mb-10">
          <div className="p-6">
            <div className="relative h-64 mb-8 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518684079-3c830dcef090')] bg-cover bg-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-3xl font-bold mb-2">Discover Your Next Adventure</h2>
                <p className="text-gray-300 max-w-2xl">Explore popular and trending destinations around the world. Find the perfect location for your next trip.</p>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="all" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    All Destinations
                  </TabsTrigger>
                  <TabsTrigger value="wishlist" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    My Wishlist
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    Popular
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-3">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search destinations..."
                      className="pl-8 bg-gray-800 border-gray-700 text-white w-full sm:w-[250px]"
                    />
                  </div>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Destination Card 1 */}
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-red-700 transition-all">
                    <div className="h-48 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499856871958-5b9357976b82')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/30 hover:bg-red-900/80 text-white"
                      >
                        <Heart size={16} className="text-red-400" />
                      </Button>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.7</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-red-700/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Flag className="h-3 w-3 mr-1" />
                        <span>France</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">Paris</h3>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Globe className="h-3 w-3 mr-1" />
                          <span>Europe</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        The City of Light, famous for the Eiffel Tower, Louvre, and exquisite cuisine. Perfect for romantic getaways.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Art & Culture</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Romantic</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Food</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-gray-400 text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>1,756 travelers</span>
                        </div>
                        <Button className="bg-red-900 hover:bg-red-800 text-white text-xs h-8 px-3">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Destination Card 2 */}
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-red-700 transition-all">
                    <div className="h-48 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523906834658-6e24ef2386f9')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/30 hover:bg-red-900/80 text-white"
                      >
                        <Heart size={16} />
                      </Button>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.8</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-red-700/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Flag className="h-3 w-3 mr-1" />
                        <span>Italy</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">Rome</h3>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Globe className="h-3 w-3 mr-1" />
                          <span>Europe</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        The Eternal City with ancient ruins, Vatican City, and some of the world's best Italian cuisine and gelato.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">History</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Architecture</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Food</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-gray-400 text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>1,453 travelers</span>
                        </div>
                        <Button className="bg-red-900 hover:bg-red-800 text-white text-xs h-8 px-3">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Destination Card 3 */}
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-red-700 transition-all">
                    <div className="h-48 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503899036084-c55cdd92da26')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/30 hover:bg-red-900/80 text-white"
                      >
                        <Heart size={16} />
                      </Button>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.9</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-red-700/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Flag className="h-3 w-3 mr-1" />
                        <span>Spain</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">Barcelona</h3>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Globe className="h-3 w-3 mr-1" />
                          <span>Europe</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        A vibrant coastal city famous for Gaudí's architecture, beaches, and incredible tapas and nightlife.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Beach</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Architecture</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Nightlife</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-gray-400 text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>1,289 travelers</span>
                        </div>
                        <Button className="bg-red-900 hover:bg-red-800 text-white text-xs h-8 px-3">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Destination Card 4 */}
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-red-700 transition-all">
                    <div className="h-48 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542051841857-5f90071e7989')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/30 hover:bg-red-900/80 text-white"
                      >
                        <Heart size={16} />
                      </Button>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.7</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-red-700/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Flag className="h-3 w-3 mr-1" />
                        <span>Japan</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">Tokyo</h3>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Globe className="h-3 w-3 mr-1" />
                          <span>Asia</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        A fascinating blend of ultramodern and traditional, with stunning temples, high-tech districts, and incredible food.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Technology</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Culture</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Food</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-gray-400 text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>1,346 travelers</span>
                        </div>
                        <Button className="bg-red-900 hover:bg-red-800 text-white text-xs h-8 px-3">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Destination Card 5 */}
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-red-700 transition-all">
                    <div className="h-48 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/30 hover:bg-red-900/80 text-white"
                      >
                        <Heart size={16} />
                      </Button>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.6</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-red-700/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Flag className="h-3 w-3 mr-1" />
                        <span>USA</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">New York</h3>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Globe className="h-3 w-3 mr-1" />
                          <span>North America</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        The Big Apple offers iconic skyscrapers, Broadway shows, Central Park, and diverse neighborhoods to explore.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Urban</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Shopping</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Entertainment</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-gray-400 text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>1,922 travelers</span>
                        </div>
                        <Button className="bg-red-900 hover:bg-red-800 text-white text-xs h-8 px-3">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Destination Card 6 */}
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden group hover:border-red-700 transition-all">
                    <div className="h-48 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2')] bg-cover bg-center group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/30 hover:bg-red-900/80 text-white"
                      >
                        <Heart size={16} />
                      </Button>
                      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>4.5</span>
                      </div>
                      <div className="absolute bottom-2 left-2 bg-red-700/70 text-white text-xs py-1 px-2 rounded-full flex items-center">
                        <Flag className="h-3 w-3 mr-1" />
                        <span>Singapore</span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold">Singapore</h3>
                        <div className="flex items-center text-gray-400 text-sm">
                          <Globe className="h-3 w-3 mr-1" />
                          <span>Asia</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        A thriving city-state with futuristic gardens, multicultural neighborhoods, and world-class street food.
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Modern</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Food</span>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">Shopping</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-gray-400 text-sm flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>1,138 travelers</span>
                        </div>
                        <Button className="bg-red-900 hover:bg-red-800 text-white text-xs h-8 px-3">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Add Destination Card */}
                  <Card className="bg-gray-800 border-gray-700 border-dashed overflow-hidden group hover:border-red-700 transition-all flex flex-col items-center justify-center p-8">
                    <div className="w-16 h-16 rounded-full bg-red-900/30 flex items-center justify-center text-red-500 mb-4">
                      <Plus size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-center mb-2">Add New Destination</h3>
                    <p className="text-gray-400 text-sm text-center mb-4">
                      Can't find what you're looking for? Add a custom destination to your list.
                    </p>
                    <Button className="bg-red-900 hover:bg-red-800 text-white flex items-center gap-2">
                      <Plus size={16} />
                      Add Destination
                    </Button>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="wishlist" className="mt-0">
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 mb-4">
                    <Heart size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Your Wishlist is Empty</h3>
                  <p className="text-gray-400 text-center max-w-md mb-6">
                    Save destinations you're interested in by clicking the heart icon on any destination card.
                  </p>
                  <Button className="bg-red-900 hover:bg-red-800 text-white">
                    Explore Destinations
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="popular" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Popular destinations would be shown here - using the same card components as above */}
                  {/* For brevity, not repeating the same cards */}
                  <div className="col-span-full">
                    <p className="text-center text-gray-400">
                      Popular destinations would be displayed here with metrics like traveler count, ratings, etc.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Destination Detail View */}
      <div className="container mx-auto px-4 mb-10">
        <h3 className="text-xl font-bold mb-6">Destination Detail View Example</h3>
        
        <div className="bg-gray-900 rounded-xl border border-red-900 overflow-hidden shadow-xl">
          <div className="h-72 md:h-96 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499856871958-5b9357976b82')] bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
            </div>
            <div className="absolute top-4 left-4">
              <Button variant="outline" className="flex items-center gap-2 bg-black/50 border-gray-500 text-white hover:bg-black/70">
                <ArrowLeft size={16} />
                Back
              </Button>
            </div>
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button variant="outline" className="bg-black/50 border-gray-500 text-white hover:bg-black/70">
                <Heart size={16} className="mr-2" />
                Save
              </Button>
              <Button className="bg-red-700 hover:bg-red-600 text-white">
                <Plus size={16} className="mr-2" />
                Add to Trip
              </Button>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-red-700 text-white text-xs py-1 px-3 rounded-full">
                  Popular
                </div>
                <div className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 fill-yellow-400 mr-1" />
                  <span>4.7</span>
                  <span className="text-gray-400 ml-1">(1,256 reviews)</span>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Paris, France</h1>
              <p className="text-gray-300 max-w-2xl">
                The City of Light, famous for its iconic landmarks, world-class cuisine, and romantic atmosphere.
              </p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-500">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <line x1="3" x2="21" y1="9" y2="9" />
                    <line x1="3" x2="21" y1="15" y2="15" />
                    <line x1="9" x2="9" y1="3" y2="21" />
                    <line x1="15" x2="15" y1="3" y2="21" />
                  </svg>
                  Best Time to Visit
                </h3>
                <p className="text-gray-400 text-sm">
                  April to June and September to November offer pleasant weather and fewer crowds, ideal for sightseeing.
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-500">
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                    <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                  </svg>
                  Weather
                </h3>
                <p className="text-gray-400 text-sm">
                  Mild temperatures with occasional rain. Summer (June-August) can be warm with average temperatures of 68-77°F.
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="font-bold mb-3 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-500">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Language
                </h3>
                <p className="text-gray-400 text-sm">
                  French is the official language, though English is widely spoken in tourist areas and major attractions.
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">About Paris</h3>
              <p className="text-gray-300 mb-4">
                Paris, the capital of France, is one of the world's most visited cities and a center for art, fashion, culture, and cuisine. Known as the "City of Light," Paris is home to iconic landmarks like the Eiffel Tower, Notre-Dame Cathedral, and the Louvre Museum.
              </p>
              <p className="text-gray-300 mb-4">
                With its charming neighborhoods, sidewalk cafes, and elegant boulevards, Paris offers visitors a blend of historic grandeur and modern sophistication. The Seine River winds through the city, with many famous monuments lining its banks.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full">Art & Museums</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full">Romantic</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full">Culinary</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full">Fashion</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full">Architecture</span>
                <span className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded-full">History</span>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Must-See Attractions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="h-40 bg-[url('https://images.unsplash.com/photo-1543349689-9a4d426bee8e')] bg-cover bg-center"></div>
                  <div className="p-3">
                    <h4 className="font-bold">Eiffel Tower</h4>
                    <p className="text-gray-400 text-sm">The iconic symbol of Paris with stunning city views.</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="h-40 bg-[url('https://images.unsplash.com/photo-1544981037-c334ccf1b771')] bg-cover bg-center"></div>
                  <div className="p-3">
                    <h4 className="font-bold">Louvre Museum</h4>
                    <p className="text-gray-400 text-sm">World's largest art museum and home to the Mona Lisa.</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="h-40 bg-[url('https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94')] bg-cover bg-center"></div>
                  <div className="p-3">
                    <h4 className="font-bold">Notre-Dame Cathedral</h4>
                    <p className="text-gray-400 text-sm">Gothic masterpiece on the Île de la Cité.</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <Button variant="link" className="text-red-400 hover:text-red-300">
                  View All Attractions <ExternalLink size={14} className="ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <Button className="bg-red-700 hover:bg-red-600 text-white px-8 py-6 text-lg">
                <Plus size={18} className="mr-2" />
                Add to Your Trip
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-red-900 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-red-400 mb-4">Destinations Interface Features</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Browse and search global destinations with detailed information</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Save favorite destinations to a personal wishlist</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>View comprehensive details including attractions, weather, and travel tips</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Filter destinations by region, type, or activity</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Add custom destinations not in the database</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Easily add destinations directly to trip planning</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}