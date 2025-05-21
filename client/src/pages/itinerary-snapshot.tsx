import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, CalendarIcon, Clock, MapPin, Plus, Edit, Trash2, ChevronDown, Save, FileText, Share2, MoreHorizontal } from 'lucide-react';

export default function ItinerarySnapshot() {
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
        <h2 className="text-xl text-gray-400 mb-8">8.5 Itinerary Builder</h2>
      </div>
      
      {/* Itinerary Builder Interface */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-xl border border-red-900 overflow-hidden shadow-xl mb-10">
          <div className="border-b border-gray-800 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button variant="ghost" className="mr-2 h-9 w-9 p-0">
                <ArrowLeft size={18} />
              </Button>
              <div>
                <h2 className="text-lg font-bold">Paris Trip Itinerary</h2>
                <div className="flex items-center text-sm text-gray-400">
                  <CalendarIcon size={14} className="mr-1" />
                  <span>June 15 - June 25, 2025 (10 days)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-gray-300">
                <Share2 size={14} className="mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-gray-300">
                <FileText size={14} className="mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-red-700 hover:bg-red-600 text-white">
                <Save size={14} className="mr-2" />
                Save
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row">
            {/* Left Panel - Calendar/Days */}
            <div className="md:w-1/4 border-r border-gray-800">
              <div className="p-4 border-b border-gray-800">
                <Input 
                  placeholder="Search activities..." 
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <div className="overflow-auto max-h-[calc(100vh-200px)]">
                <div className="p-2">
                  <Button className="w-full bg-red-900 hover:bg-red-800 text-white mb-4 justify-start">
                    <Plus size={16} className="mr-2" />
                    Add Day
                  </Button>
                  
                  {/* Day Items */}
                  <div className="space-y-2">
                    <div className="bg-red-900/20 border-l-4 border-red-700 rounded-r p-3 hover:bg-red-900/30 transition cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day 1</h3>
                        <span className="text-xs text-gray-400">June 15</span>
                      </div>
                      <p className="text-sm text-gray-400">Arrival & Eiffel Tower</p>
                    </div>
                    
                    <div className="hover:bg-gray-800/50 border-l-4 border-transparent rounded-r p-3 transition cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day 2</h3>
                        <span className="text-xs text-gray-400">June 16</span>
                      </div>
                      <p className="text-sm text-gray-400">Louvre & Seine River</p>
                    </div>
                    
                    <div className="hover:bg-gray-800/50 border-l-4 border-transparent rounded-r p-3 transition cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day 3</h3>
                        <span className="text-xs text-gray-400">June 17</span>
                      </div>
                      <p className="text-sm text-gray-400">Notre Dame & Latin Quarter</p>
                    </div>
                    
                    <div className="hover:bg-gray-800/50 border-l-4 border-transparent rounded-r p-3 transition cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day 4</h3>
                        <span className="text-xs text-gray-400">June 18</span>
                      </div>
                      <p className="text-sm text-gray-400">Montmartre & Sacré-Cœur</p>
                    </div>
                    
                    <div className="hover:bg-gray-800/50 border-l-4 border-transparent rounded-r p-3 transition cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day 5</h3>
                        <span className="text-xs text-gray-400">June 19</span>
                      </div>
                      <p className="text-sm text-gray-400">Versailles Day Trip</p>
                    </div>
                    
                    <div className="hover:bg-gray-800/50 border-l-4 border-transparent rounded-r p-3 transition cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day 6</h3>
                        <span className="text-xs text-gray-400">June 20</span>
                      </div>
                      <p className="text-sm text-gray-400">Shopping & Galleries</p>
                    </div>
                    
                    <div className="hover:bg-gray-800/50 border-l-4 border-transparent rounded-r p-3 transition cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day 7</h3>
                        <span className="text-xs text-gray-400">June 21</span>
                      </div>
                      <p className="text-sm text-gray-400">Luxembourg Garden & Panthéon</p>
                    </div>
                    
                    <div className="hover:bg-gray-800/50 border-l-4 border-transparent rounded-r p-3 transition cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day 8</h3>
                        <span className="text-xs text-gray-400">June 22</span>
                      </div>
                      <p className="text-sm text-gray-400">Catacombs & Food Tour</p>
                    </div>
                    
                    <div className="hover:bg-gray-800/50 border-l-4 border-transparent rounded-r p-3 transition cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day 9</h3>
                        <span className="text-xs text-gray-400">June 23</span>
                      </div>
                      <p className="text-sm text-gray-400">Free Day & Shopping</p>
                    </div>
                    
                    <div className="hover:bg-gray-800/50 border-l-4 border-transparent rounded-r p-3 transition cursor-pointer">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Day 10</h3>
                        <span className="text-xs text-gray-400">June 24</span>
                      </div>
                      <p className="text-sm text-gray-400">Departure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Day Details */}
            <div className="md:w-3/4">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <div className="flex items-center">
                      <h2 className="text-2xl font-bold mr-2">Day 1: Arrival & Eiffel Tower</h2>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <Edit size={14} />
                      </Button>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <CalendarIcon size={14} className="mr-1" />
                      <span>June 15, 2025</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-gray-300">
                      <Plus size={14} className="mr-1" />
                      Add Activity
                    </Button>
                    <Button variant="outline" size="sm" className="bg-gray-800 border-gray-700 text-gray-300 px-2">
                      <MoreHorizontal size={16} />
                    </Button>
                  </div>
                </div>
                
                {/* Timeline */}
                <div className="relative pl-8 border-l border-gray-700 ml-4 space-y-6">
                  {/* Morning Activity */}
                  <div className="relative">
                    <div className="absolute -left-12 mt-1 w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center text-red-500">
                      <Clock size={16} />
                    </div>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <span className="text-xs bg-red-900/50 text-white px-2 py-0.5 rounded-full mr-2">10:00 AM - 12:00 PM</span>
                              <h3 className="font-bold">Arrival at Charles de Gaulle Airport</h3>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">
                              Arrive at Paris Charles de Gaulle Airport (CDG). Go through customs and immigration.
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400">
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-red-500">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                              </svg>
                              Location
                            </h4>
                            <p className="text-gray-400">Charles de Gaulle Airport (CDG), Terminal 2E</p>
                          </div>
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-red-500">
                                <path d="M12 2v2" />
                                <path d="M12 8v4l2 2" />
                                <circle cx="12" cy="12" r="10" />
                              </svg>
                              Duration
                            </h4>
                            <p className="text-gray-400">Approximately 2 hours</p>
                          </div>
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-red-500">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                              </svg>
                              Notes
                            </h4>
                            <p className="text-gray-400">Flight AF1234 from New York JFK</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Transportation Activity */}
                  <div className="relative">
                    <div className="absolute -left-12 mt-1 w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <path d="M8 2h8" />
                        <path d="M8 22h8" />
                        <path d="M10 6h4" />
                        <circle cx="12" cy="13" r="3" />
                      </svg>
                    </div>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <span className="text-xs bg-blue-900/50 text-white px-2 py-0.5 rounded-full mr-2">12:30 PM - 2:00 PM</span>
                              <h3 className="font-bold">Airport to Hotel Transfer</h3>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">
                              Take a taxi or RER B train from CDG to the hotel in central Paris.
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400">
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-blue-500">
                                <circle cx="12" cy="12" r="10" />
                                <path d="m9 12 2 2 4-4" />
                              </svg>
                              Transportation
                            </h4>
                            <p className="text-gray-400">RER B Train or Taxi</p>
                          </div>
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-blue-500">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                              </svg>
                              Cost
                            </h4>
                            <p className="text-gray-400">€10-15 (train) or €50-60 (taxi)</p>
                          </div>
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-blue-500">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                              </svg>
                              Notes
                            </h4>
                            <p className="text-gray-400">RER B stops at Châtelet-Les-Halles, near hotel</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Accommodation Activity */}
                  <div className="relative">
                    <div className="absolute -left-12 mt-1 w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20h20" />
                        <path d="M5 4v6" />
                        <path d="M19 4v6" />
                        <path d="M5 10h14" />
                        <path d="M5 14h14" />
                        <path d="M9 14v6" />
                        <path d="M15 14v6" />
                        <path d="M10 4h4" />
                      </svg>
                    </div>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <span className="text-xs bg-green-900/50 text-white px-2 py-0.5 rounded-full mr-2">2:00 PM - 3:30 PM</span>
                              <h3 className="font-bold">Hotel Check-in & Rest</h3>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">
                              Check in at Hotel Le Marais, freshen up and rest after the journey.
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400">
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-green-500">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                              </svg>
                              Location
                            </h4>
                            <p className="text-gray-400">Hotel Le Marais, 12 Rue de Rivoli</p>
                          </div>
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-green-500">
                                <rect x="2" y="5" width="20" height="14" rx="2" />
                                <path d="M2 10h20" />
                              </svg>
                              Reservation
                            </h4>
                            <p className="text-gray-400">Confirmation #H12345678</p>
                          </div>
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-green-500">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                              </svg>
                              Notes
                            </h4>
                            <p className="text-gray-400">Room type: Deluxe Double with Eiffel Tower View</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Evening Activity */}
                  <div className="relative">
                    <div className="absolute -left-12 mt-1 w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                    </div>
                    <Card className="bg-gray-800 border-gray-700">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <span className="text-xs bg-purple-900/50 text-white px-2 py-0.5 rounded-full mr-2">5:00 PM - 9:00 PM</span>
                              <h3 className="font-bold">Eiffel Tower Visit & Dinner</h3>
                            </div>
                            <p className="text-gray-400 text-sm mt-2">
                              Visit the iconic Eiffel Tower at sunset, followed by dinner at a nearby bistro.
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Edit size={14} />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-red-400">
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-purple-500">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                                <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                                <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                                <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                              </svg>
                              Location
                            </h4>
                            <p className="text-gray-400">Eiffel Tower, Champ de Mars</p>
                          </div>
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-purple-500">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                              </svg>
                              Cost
                            </h4>
                            <p className="text-gray-400">€17.10 adult ticket (2nd floor) + €60 dinner</p>
                          </div>
                          <div className="bg-gray-900/50 p-3 rounded">
                            <h4 className="font-medium mb-1 flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-purple-500">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
                              </svg>
                              Notes
                            </h4>
                            <p className="text-gray-400">Dinner at Bistro Chez Marie at 7:30 PM</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4 text-sm">
                          <div className="flex space-x-2">
                            <div className="bg-gray-900/50 py-1 px-2 rounded flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-yellow-500">
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                              </svg>
                              <span className="text-gray-400">Must-see</span>
                            </div>
                            <div className="bg-gray-900/50 py-1 px-2 rounded flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-green-500">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                              </svg>
                              <span className="text-gray-400">Romantic</span>
                            </div>
                          </div>
                          <div className="text-gray-500 text-xs">
                            Tickets purchased
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                {/* Add New Activity Button */}
                <div className="mt-6 text-center">
                  <Button className="bg-gray-800 hover:bg-gray-700 text-gray-400 border border-dashed border-gray-700">
                    <Plus size={16} className="mr-2" />
                    Add Activity
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add Activity Modal Example */}
      <div className="container mx-auto px-4 mb-10">
        <h3 className="text-xl font-bold mb-6">Add Activity Modal Example</h3>
        
        <div className="bg-gray-900 rounded-xl border border-red-900 overflow-hidden shadow-xl p-6 max-w-2xl mx-auto">
          <div className="mb-4 pb-4 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-xl font-bold">Add New Activity</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="activity-name">Activity Name</Label>
                <Input id="activity-name" placeholder="e.g. Museum Visit" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity-type">Activity Type</Label>
                <Select>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="attraction">Attraction</SelectItem>
                    <SelectItem value="food">Food & Dining</SelectItem>
                    <SelectItem value="transport">Transportation</SelectItem>
                    <SelectItem value="accommodation">Accommodation</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input id="start-time" type="time" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input id="end-time" type="time" className="bg-gray-800 border-gray-700 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g. Louvre Museum, Rue de Rivoli" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea 
                id="description" 
                rows={3}
                placeholder="Describe the activity..."
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost">Cost (€)</Label>
                <Input id="cost" type="number" placeholder="0.00" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reservation-number">Reservation #</Label>
                <Input id="reservation-number" placeholder="Optional" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="activity-tags">Tags</Label>
                <Input id="activity-tags" placeholder="e.g. must-see, family" className="bg-gray-800 border-gray-700 text-white" />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-700">
                Cancel
              </Button>
              <Button className="bg-red-700 hover:bg-red-600 text-white">
                Add Activity
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-red-900 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-red-400 mb-4">Itinerary Builder Interface Features</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Day-by-day itinerary planning with timeline visualization</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Flexible activity management with time slots and detailed information</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Activity categorization by type (attractions, dining, transportation, etc.)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Location, cost, and reservation details for each activity</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Export and sharing options for itineraries</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Visual timeline interface with color-coded activity types</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}