import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CalendarIcon, MapPin, Clock, Plus, Filter, Search, Edit, Trash2, ChevronRight } from 'lucide-react';

export default function TripManagementSnapshot() {
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
        <h2 className="text-xl text-gray-400 mb-8">8.3 Trip Management</h2>
      </div>
      
      {/* Trip Management Interface */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-xl border border-red-900 overflow-hidden shadow-xl mb-10">
          <div className="p-6">
            <Tabs defaultValue="trips" className="w-full">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="trips" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    My Trips
                  </TabsTrigger>
                  <TabsTrigger value="create" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    Create Trip
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-3">
                  <div className="relative flex-grow">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search trips..."
                      className="pl-8 bg-gray-800 border-gray-700 text-white w-full sm:w-[250px]"
                    />
                  </div>
                  <Button variant="outline" className="bg-gray-800 border-gray-700 text-white">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              
              <TabsContent value="trips" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {/* Trip Card 1 - Upcoming */}
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499856871958-5b9357976b82')] bg-cover bg-center">
                          <div className="absolute inset-0 bg-black/30"></div>
                        </div>
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs py-1 px-2 rounded">
                          Upcoming
                        </div>
                      </div>
                      <CardContent className="p-5 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">Paris Getaway</h3>
                            <div className="flex items-center text-gray-400 mt-1">
                              <MapPin size={16} className="mr-1" />
                              <span>Paris, France</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" className="h-8 w-8 p-0" title="Edit Trip">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-red-400" title="Delete Trip">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-gray-400">
                            <CalendarIcon size={16} className="mr-2" />
                            <span>June 15 - June 25, 2025 (10 days)</span>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Clock size={16} className="mr-2" />
                            <span>15 days from now</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-red-600 h-2 rounded-full w-4/5"></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-400">80%</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-gray-800">J</div>
                            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center ring-2 ring-gray-800">S</div>
                            <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center ring-2 ring-gray-800">M</div>
                          </div>
                          <Button className="bg-red-900 hover:bg-red-800 text-white flex items-center gap-1">
                            View Details <ChevronRight size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                  
                  {/* Trip Card 2 - Upcoming */}
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9')] bg-cover bg-center">
                          <div className="absolute inset-0 bg-black/30"></div>
                        </div>
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs py-1 px-2 rounded">
                          Upcoming
                        </div>
                      </div>
                      <CardContent className="p-5 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">Italian Adventure</h3>
                            <div className="flex items-center text-gray-400 mt-1">
                              <MapPin size={16} className="mr-1" />
                              <span>Rome, Italy</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" className="h-8 w-8 p-0" title="Edit Trip">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-red-400" title="Delete Trip">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-gray-400">
                            <CalendarIcon size={16} className="mr-2" />
                            <span>July 18 - July 28, 2025 (10 days)</span>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Clock size={16} className="mr-2" />
                            <span>48 days from now</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full w-full"></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-400">100%</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-gray-800">J</div>
                            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center ring-2 ring-gray-800">A</div>
                          </div>
                          <Button className="bg-red-900 hover:bg-red-800 text-white flex items-center gap-1">
                            View Details <ChevronRight size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                  
                  {/* Trip Card 3 - In Planning */}
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542051841857-5f90071e7989')] bg-cover bg-center">
                          <div className="absolute inset-0 bg-black/30"></div>
                        </div>
                        <div className="absolute top-3 left-3 bg-yellow-600 text-white text-xs py-1 px-2 rounded">
                          In Planning
                        </div>
                      </div>
                      <CardContent className="p-5 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">Tokyo Exploration</h3>
                            <div className="flex items-center text-gray-400 mt-1">
                              <MapPin size={16} className="mr-1" />
                              <span>Tokyo, Japan</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" className="h-8 w-8 p-0" title="Edit Trip">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-red-400" title="Delete Trip">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-gray-400">
                            <CalendarIcon size={16} className="mr-2" />
                            <span>September 5 - September 15, 2025 (10 days)</span>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Clock size={16} className="mr-2" />
                            <span>97 days from now</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-yellow-600 h-2 rounded-full w-2/5"></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-400">40%</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-gray-800">J</div>
                          </div>
                          <Button className="bg-red-900 hover:bg-red-800 text-white flex items-center gap-1">
                            View Details <ChevronRight size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                  
                  {/* Trip Card 4 - Completed */}
                  <Card className="bg-gray-800 border-gray-700 overflow-hidden">
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-1/3 h-48 md:h-auto relative">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539037116277-4db20889f2d4')] bg-cover bg-center">
                          <div className="absolute inset-0 bg-black/30"></div>
                        </div>
                        <div className="absolute top-3 left-3 bg-green-600 text-white text-xs py-1 px-2 rounded">
                          Completed
                        </div>
                      </div>
                      <CardContent className="p-5 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-bold">Barcelona Weekend</h3>
                            <div className="flex items-center text-gray-400 mt-1">
                              <MapPin size={16} className="mr-1" />
                              <span>Barcelona, Spain</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" className="h-8 w-8 p-0" title="Edit Trip">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-red-400" title="Delete Trip">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-gray-400">
                            <CalendarIcon size={16} className="mr-2" />
                            <span>March 10 - March 15, 2025 (5 days)</span>
                          </div>
                          <div className="flex items-center text-gray-400">
                            <Clock size={16} className="mr-2" />
                            <span>Completed 3 days ago</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-4">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full w-full"></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-400">100%</span>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-gray-800">J</div>
                            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center ring-2 ring-gray-800">L</div>
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center ring-2 ring-gray-800">K</div>
                          </div>
                          <Button className="bg-red-900 hover:bg-red-800 text-white flex items-center gap-1">
                            View Details <ChevronRight size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="create" className="mt-0">
                <Card className="bg-gray-800 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Create New Trip</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="trip-name">Trip Name</Label>
                          <Input id="trip-name" placeholder="e.g. Summer Vacation in Paris" className="bg-gray-700 border-gray-600 text-white" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="destination">Destination</Label>
                          <Select>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="Select a destination" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="paris">Paris, France</SelectItem>
                              <SelectItem value="rome">Rome, Italy</SelectItem>
                              <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                              <SelectItem value="new-york">New York, USA</SelectItem>
                              <SelectItem value="barcelona">Barcelona, Spain</SelectItem>
                              <SelectItem value="new">+ Add New Destination</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="start-date">Start Date</Label>
                            <div className="relative">
                              <Input 
                                id="start-date" 
                                type="date"
                                className="bg-gray-700 border-gray-600 text-white" 
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="end-date">End Date</Label>
                            <div className="relative">
                              <Input 
                                id="end-date" 
                                type="date"
                                className="bg-gray-700 border-gray-600 text-white" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <textarea 
                            id="description" 
                            rows={3}
                            placeholder="Brief description of your trip"
                            className="w-full min-h-[120px] bg-gray-700 border border-gray-600 text-white rounded-md p-2"
                          ></textarea>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Trip Members</Label>
                          <div className="flex flex-wrap gap-2 p-2 border border-gray-600 rounded-md bg-gray-700">
                            <div className="flex items-center bg-red-900/50 rounded-full pl-1 pr-2 py-0.5">
                              <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-1 text-xs">J</div>
                              <span className="text-sm">John Doe (You)</span>
                            </div>
                            <Button variant="outline" size="sm" className="h-7 rounded-full bg-gray-800 border-gray-600 text-white">
                              <Plus className="h-3.5 w-3.5 mr-1" />
                              Add Members
                            </Button>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Privacy</Label>
                          <Select defaultValue="private">
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-700 text-white">
                              <SelectItem value="private">Private (Only invited members)</SelectItem>
                              <SelectItem value="friends">Friends Only</SelectItem>
                              <SelectItem value="public">Public (Anyone can view)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-6 space-x-3">
                      <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-700">
                        Cancel
                      </Button>
                      <Button className="bg-red-700 hover:bg-red-600 text-white">
                        Create Trip
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-red-900 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-red-400 mb-4">Trip Management Interface Features</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>List view of all trips with filtering and sorting options</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Visual status indicators for trip planning progress</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Collaborative trip planning with member management</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Date range selection with automatic duration calculation</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Privacy controls for sharing trip details</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Quick access to edit, view, or delete trips</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}