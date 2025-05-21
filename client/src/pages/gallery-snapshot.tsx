import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Search, Filter, Plus, Heart, Download, Share2, MoreHorizontal, Trash2, Calendar, MapPin, Edit, Upload, ImagePlus } from 'lucide-react';

export default function GallerySnapshot() {
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
        <h2 className="text-xl text-gray-400 mb-8">8.6 Photo Gallery</h2>
      </div>
      
      {/* Photo Gallery Interface */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-xl border border-red-900 overflow-hidden shadow-xl mb-10">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold">Travel Photo Gallery</h2>
                <p className="text-gray-400">Manage and share your travel memories</p>
              </div>
              <Button className="bg-red-700 hover:bg-red-600 text-white">
                <Upload size={16} className="mr-2" />
                Upload Photos
              </Button>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="all" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    All Photos
                  </TabsTrigger>
                  <TabsTrigger value="favorites" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    Favorites
                  </TabsTrigger>
                  <TabsTrigger value="trips" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    By Trip
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-3">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search photos..."
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* Photo Item 1 */}
                  <div className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img 
                        src="https://images.unsplash.com/photo-1499856871958-5b9357976b82" 
                        alt="Eiffel Tower, Paris"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-medium text-white text-sm mb-1 truncate">Eiffel Tower at Sunset</h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-300">
                              <MapPin size={12} className="mr-1" />
                              <span>Paris, France</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-300">
                              <Calendar size={12} className="mr-1" />
                              <span>June 17, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <Heart size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Item 2 */}
                  <div className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img 
                        src="https://images.unsplash.com/photo-1544981037-c334ccf1b771" 
                        alt="Louvre Museum, Paris"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-medium text-white text-sm mb-1 truncate">Louvre Museum Glass Pyramid</h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-300">
                              <MapPin size={12} className="mr-1" />
                              <span>Paris, France</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-300">
                              <Calendar size={12} className="mr-1" />
                              <span>June 18, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <Heart size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Item 3 */}
                  <div className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img 
                        src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9" 
                        alt="Colosseum, Rome"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-medium text-white text-sm mb-1 truncate">Ancient Colosseum</h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-300">
                              <MapPin size={12} className="mr-1" />
                              <span>Rome, Italy</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-300">
                              <Calendar size={12} className="mr-1" />
                              <span>July 5, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <Heart size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Item 4 */}
                  <div className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img 
                        src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9" 
                        alt="Venice Canals, Italy"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-medium text-white text-sm mb-1 truncate">Venetian Canal Gondolas</h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-300">
                              <MapPin size={12} className="mr-1" />
                              <span>Venice, Italy</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-300">
                              <Calendar size={12} className="mr-1" />
                              <span>July 10, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <Heart size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Item 5 - With Heart */}
                  <div className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img 
                        src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65" 
                        alt="Santorini, Greece"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-medium text-white text-sm mb-1 truncate">Santorini Blue Domes</h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-300">
                              <MapPin size={12} className="mr-1" />
                              <span>Santorini, Greece</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-300">
                              <Calendar size={12} className="mr-1" />
                              <span>August 3, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-red-500 hover:bg-black/70">
                          <Heart size={14} className="fill-current" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Item 6 */}
                  <div className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img 
                        src="https://images.unsplash.com/photo-1529655683826-aba9b3e77383" 
                        alt="London, UK"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-medium text-white text-sm mb-1 truncate">London Clock Tower (Big Ben)</h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-300">
                              <MapPin size={12} className="mr-1" />
                              <span>London, UK</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-300">
                              <Calendar size={12} className="mr-1" />
                              <span>May 22, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <Heart size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Item 7 */}
                  <div className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img 
                        src="https://images.unsplash.com/photo-1542051841857-5f90071e7989" 
                        alt="Tokyo, Japan"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-medium text-white text-sm mb-1 truncate">Tokyo Shibuya Crossing</h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-300">
                              <MapPin size={12} className="mr-1" />
                              <span>Tokyo, Japan</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-300">
                              <Calendar size={12} className="mr-1" />
                              <span>September 15, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <Heart size={14} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Photo Item 8 - With Heart */}
                  <div className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img 
                        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c" 
                        alt="Barcelona, Spain"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-medium text-white text-sm mb-1 truncate">Sagrada Familia Cathedral</h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-300">
                              <MapPin size={12} className="mr-1" />
                              <span>Barcelona, Spain</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-300">
                              <Calendar size={12} className="mr-1" />
                              <span>March 12, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-red-500 hover:bg-black/70">
                          <Heart size={14} className="fill-current" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add Photos Card */}
                  <div className="aspect-square rounded-lg bg-gray-800 border border-dashed border-gray-600 flex flex-col items-center justify-center p-4 hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
                      <ImagePlus size={24} className="text-gray-400" />
                    </div>
                    <p className="text-gray-400 text-center font-medium">Upload New Photos</p>
                    <p className="text-gray-500 text-sm text-center mt-2">Drag files here or click to browse</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {/* Only the photos with hearts would appear here */}
                  <div className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img 
                        src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65" 
                        alt="Santorini, Greece"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-medium text-white text-sm mb-1 truncate">Santorini Blue Domes</h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-300">
                              <MapPin size={12} className="mr-1" />
                              <span>Santorini, Greece</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-300">
                              <Calendar size={12} className="mr-1" />
                              <span>August 3, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-red-500 hover:bg-black/70">
                          <Heart size={14} className="fill-current" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group relative">
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                      <img 
                        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c" 
                        alt="Barcelona, Spain"
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-medium text-white text-sm mb-1 truncate">Sagrada Familia Cathedral</h3>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-gray-300">
                              <MapPin size={12} className="mr-1" />
                              <span>Barcelona, Spain</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-300">
                              <Calendar size={12} className="mr-1" />
                              <span>March 12, 2024</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-red-500 hover:bg-black/70">
                          <Heart size={14} className="fill-current" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/50 text-white hover:bg-black/70">
                          <MoreHorizontal size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trips" className="mt-0">
                <div className="space-y-8">
                  {/* Paris Trip Photos */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Paris Trip (June 15-25, 2024)</h3>
                      <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-gray-300">
                        See All
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                        <img 
                          src="https://images.unsplash.com/photo-1499856871958-5b9357976b82" 
                          alt="Eiffel Tower, Paris"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                        <img 
                          src="https://images.unsplash.com/photo-1544981037-c334ccf1b771" 
                          alt="Louvre Museum, Paris"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                        <img 
                          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" 
                          alt="Paris Street View"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-800">
                        <img 
                          src="https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f" 
                          alt="Notre Dame, Paris"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <p className="text-white font-medium">+12 more</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Italy Trip Photos */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold">Italy Tour (July 5-15, 2024)</h3>
                      <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-gray-300">
                        See All
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                        <img 
                          src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9" 
                          alt="Colosseum, Rome"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                        <img 
                          src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9" 
                          alt="Venice Canals, Italy"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="aspect-square overflow-hidden rounded-lg bg-gray-800">
                        <img 
                          src="https://images.unsplash.com/photo-1533676802871-eca1ae998cd5" 
                          alt="Tuscany Landscape, Italy"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-800">
                        <img 
                          src="https://images.unsplash.com/photo-1516108317508-6788f6a160e4" 
                          alt="Florence Cathedral, Italy"
                          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <p className="text-white font-medium">+18 more</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Photo Detail View */}
      <div className="container mx-auto px-4 mb-10">
        <h3 className="text-xl font-bold mb-6">Photo Detail View Example</h3>
        
        <div className="bg-gray-900 rounded-xl border border-red-900 overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {/* Left panel - Photo */}
            <div className="md:col-span-2 h-[30rem] md:h-auto relative bg-black">
              <img 
                src="https://images.unsplash.com/photo-1499856871958-5b9357976b82" 
                alt="Eiffel Tower, Paris"
                className="absolute inset-0 w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4">
                <Button variant="outline" className="bg-black/50 border-gray-600 text-white hover:bg-black/70">
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="flex space-x-2">
                  <Button variant="outline" className="bg-black/50 border-gray-600 text-white hover:bg-black/70">
                    <Heart size={16} className="mr-2" />
                    Like
                  </Button>
                  <Button variant="outline" className="bg-black/50 border-gray-600 text-white hover:bg-black/70">
                    <Download size={16} className="mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <Button variant="outline" className="bg-black/50 border-gray-600 text-white hover:bg-black/70">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Right panel - Details */}
            <div className="p-6 bg-gray-900 overflow-y-auto max-h-[30rem] md:max-h-[40rem]">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">Eiffel Tower at Sunset</h2>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-500 hover:bg-gray-800">
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-400">
                  <Calendar size={16} className="mr-2" />
                  <span>June 17, 2024 at 8:15 PM</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>Paris Trip (June 15-25, 2024)</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-400 text-sm">
                  Caught this breathtaking view of the Eiffel Tower right at sunset. The golden hour light made the whole scene magical. One of the best moments of the entire Paris trip!
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">sunset</div>
                  <div className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">eiffel tower</div>
                  <div className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">paris</div>
                  <div className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">landmark</div>
                  <div className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">architecture</div>
                  <div className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full">travel</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">More from this trip</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square overflow-hidden rounded bg-gray-800">
                    <img 
                      src="https://images.unsplash.com/photo-1544981037-c334ccf1b771" 
                      alt="Louvre Museum, Paris"
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded bg-gray-800">
                    <img 
                      src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" 
                      alt="Paris Street View"
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded bg-gray-800">
                    <img 
                      src="https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f" 
                      alt="Notre Dame, Paris"
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-red-900 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-red-400 mb-4">Photo Gallery Interface Features</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Grid-based gallery for browsing travel photos</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Photo organization by trips, favorites, and date</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Detailed photo view with location, date, and trip information</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Photo uploading with drag-and-drop functionality</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Adding metadata including location, descriptions, and tags</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Sharing and downloading options for photos</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}