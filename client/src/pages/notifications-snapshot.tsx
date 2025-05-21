import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Bell, X, Calendar, MapPin, Clock, AlertTriangle, Info, Check, User, Settings, Star } from 'lucide-react';

export default function NotificationsSnapshot() {
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
        <h2 className="text-xl text-gray-400 mb-8">8.7 Notifications</h2>
      </div>
      
      {/* Notifications Interface */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-xl border border-red-900 overflow-hidden shadow-xl mb-10">
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex items-center">
                <Bell size={24} className="text-red-500 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold">Notifications</h2>
                  <p className="text-gray-400">Stay updated on your travel plans and activities</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                  <Settings size={16} className="mr-2" />
                  Notification Settings
                </Button>
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-gray-300">
                  <Check size={16} className="mr-2" />
                  Mark All as Read
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="bg-gray-800">
                  <TabsTrigger value="all" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    Unread
                    <span className="ml-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      4
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="important" className="data-[state=active]:bg-red-900 data-[state=active]:text-white">
                    Important
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0 space-y-4">
                {/* Travel Alert Notification */}
                <Card className="bg-gray-800 border-l-4 border-l-amber-500 border-y-0 border-r-0 rounded-r-lg shadow-md hover:bg-gray-750">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <AlertTriangle size={18} className="text-amber-500" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-amber-100">Travel Alert: Weather Advisory for Paris</h3>
                            <p className="text-sm text-gray-400 mt-1">
                              Heavy rainfall expected in Paris on June 17-18. Consider indoor activities or bring rain gear.
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">2 hours ago</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-400 mt-3">
                          <div className="flex items-center mr-4">
                            <Calendar size={12} className="mr-1" />
                            <span>June 15 - June 25, 2025</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={12} className="mr-1" />
                            <span>Paris, France</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Reminder Notification - Unread */}
                <Card className="bg-gray-800 border-l-4 border-l-blue-500 border-y-0 border-r-0 rounded-r-lg shadow-md hover:bg-gray-750">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Clock size={18} className="text-blue-500" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-bold text-white">Reminder: Flight to Paris in 3 Days</h3>
                              <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">New</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                              Your flight AF1234 from JFK to CDG is scheduled for June 15 at 8:30 PM. Don't forget to check in online.
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">12 hours ago</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center mt-3">
                          <Button variant="outline" size="sm" className="h-7 bg-gray-900 border-gray-600 text-gray-300 text-xs mr-2">
                            View Flight Details
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 bg-gray-900 border-gray-600 text-gray-300 text-xs">
                            Check In Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Reservation Confirmation - Unread */}
                <Card className="bg-gray-800 border-l-4 border-l-green-500 border-y-0 border-r-0 rounded-r-lg shadow-md hover:bg-gray-750">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-bold text-white">Hotel Reservation Confirmed</h3>
                              <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">New</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                              Your reservation at Hotel Le Marais in Paris is confirmed for June 15-25, 2025. Confirmation #H12345678.
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">1 day ago</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="bg-gray-900/60 rounded-md p-3 mt-3 text-sm">
                          <h4 className="font-medium text-gray-300 mb-1">Reservation Details:</h4>
                          <ul className="space-y-1 text-gray-400">
                            <li className="flex items-center">
                              <span className="bg-gray-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                              Check-in: June 15, 2025 (After 3:00 PM)
                            </li>
                            <li className="flex items-center">
                              <span className="bg-gray-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                              Check-out: June 25, 2025 (Before 11:00 AM)
                            </li>
                            <li className="flex items-center">
                              <span className="bg-gray-800 w-1.5 h-1.5 rounded-full mr-2"></span>
                              Room Type: Deluxe Double with Eiffel Tower View
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Payment Notification - Unread */}
                <Card className="bg-gray-800 border-l-4 border-l-purple-500 border-y-0 border-r-0 rounded-r-lg shadow-md hover:bg-gray-750">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                          <rect width="20" height="14" x="2" y="5" rx="2" />
                          <line x1="2" x2="22" y1="10" y2="10" />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-bold text-white">Payment Processed: Eiffel Tower Tickets</h3>
                              <span className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">New</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                              Your payment of €34.20 for Eiffel Tower tickets has been processed successfully. Confirmation #ET87654321.
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">2 days ago</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center mt-3">
                          <Button variant="outline" size="sm" className="h-7 bg-gray-900 border-gray-600 text-gray-300 text-xs">
                            View Ticket Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Trip Update Notification - Read */}
                <Card className="bg-gray-800/60 border-l-4 border-l-blue-500/50 border-y-0 border-r-0 rounded-r-lg shadow-md hover:bg-gray-750">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Info size={18} className="text-blue-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-300">Trip Itinerary Updated</h3>
                            <p className="text-sm text-gray-400 mt-1">
                              The itinerary for your Paris trip has been updated. Added Louvre Museum visit on June 16.
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">3 days ago</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center text-xs text-gray-400 mt-3">
                          <div className="flex items-center mr-4">
                            <Calendar size={12} className="mr-1" />
                            <span>June 15 - June 25, 2025</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={12} className="mr-1" />
                            <span>Paris, France</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Friend Notification - Read */}
                <Card className="bg-gray-800/60 border-l-4 border-l-indigo-500/50 border-y-0 border-r-0 rounded-r-lg shadow-md hover:bg-gray-750">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <User size={18} className="text-indigo-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-300">Sarah Johnson Joined Your Trip</h3>
                            <p className="text-sm text-gray-400 mt-1">
                              Sarah Johnson has accepted your invitation to join the Paris trip (June 15-25, 2025).
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">5 days ago</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recommendation Notification - Read */}
                <Card className="bg-gray-800/60 border-l-4 border-l-yellow-500/50 border-y-0 border-r-0 rounded-r-lg shadow-md hover:bg-gray-750">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Star size={18} className="text-yellow-400" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-300">Recommended: Popular Restaurants in Paris</h3>
                            <p className="text-sm text-gray-400 mt-1">
                              Based on your upcoming trip to Paris, we've put together a list of popular restaurants to consider.
                            </p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 mr-2">1 week ago</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <div className="bg-gray-900/60 px-3 py-1 rounded-full text-xs text-gray-300 flex items-center">
                            <span className="bg-yellow-500/60 w-1.5 h-1.5 rounded-full mr-1.5"></span>
                            Le Petit Bistro
                          </div>
                          <div className="bg-gray-900/60 px-3 py-1 rounded-full text-xs text-gray-300 flex items-center">
                            <span className="bg-yellow-500/60 w-1.5 h-1.5 rounded-full mr-1.5"></span>
                            Café de Paris
                          </div>
                          <div className="bg-gray-900/60 px-3 py-1 rounded-full text-xs text-gray-300 flex items-center">
                            <span className="bg-yellow-500/60 w-1.5 h-1.5 rounded-full mr-1.5"></span>
                            L'Atelier de Joël Robuchon
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="unread" className="mt-0 space-y-4">
                {/* This would contain just the unread notifications */}
                {/* For brevity, only showing placeholder text */}
                <div className="text-center text-gray-500 py-4">
                  This tab would display only the unread notifications (the ones marked with the red "New" badge).
                </div>
              </TabsContent>
              
              <TabsContent value="important" className="mt-0 space-y-4">
                {/* This would contain just the important notifications */}
                {/* For brevity, only showing placeholder text */}
                <div className="text-center text-gray-500 py-4">
                  This tab would display only the important notifications that require immediate attention.
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Notification Settings Panel */}
      <div className="container mx-auto px-4 mb-10">
        <h3 className="text-xl font-bold mb-6">Notification Settings Panel Example</h3>
        
        <div className="bg-gray-900 rounded-xl border border-red-900 overflow-hidden shadow-xl p-6 max-w-2xl mx-auto">
          <div className="mb-6 pb-6 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center">
              <Settings size={20} className="text-red-500 mr-2" />
              <h3 className="text-xl font-bold">Notification Settings</h3>
            </div>
            <Button variant="outline" className="bg-transparent border-gray-600 text-white hover:bg-gray-800">
              <Check size={16} className="mr-2" />
              Save Changes
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4">Notification Channels</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-500">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a1.999 1.999 0 0 1-3.46 0" />
                    </svg>
                    <span>In-App Notifications</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-red-600 transition-transform" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-500">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>SMS Notifications</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-gray-400 transition-transform" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-red-500">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span>Email Notifications</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-red-600 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Notification Types</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle size={16} className="mr-2 text-amber-500" />
                    <span>Travel Alerts</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-red-600 transition-transform" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-2 text-blue-500" />
                    <span>Trip Reminders</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-red-600 transition-transform" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-green-500">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Booking Confirmations</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-red-600 transition-transform" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-purple-500">
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <line x1="2" x2="22" y1="10" y2="10" />
                    </svg>
                    <span>Payment Updates</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-red-600 transition-transform" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User size={16} className="mr-2 text-indigo-500" />
                    <span>Friend Activities</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-red-600 transition-transform" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star size={16} className="mr-2 text-yellow-500" />
                    <span>Recommendations</span>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none">
                    <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-gray-400 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Notification Timing</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-cyan-500" />
                    <span>Flight Reminders</span>
                  </div>
                  <select className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-1 text-sm">
                    <option>24 hours before</option>
                    <option>48 hours before</option>
                    <option>72 hours before</option>
                    <option>1 week before</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-cyan-500">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Hotel Check-in Reminders</span>
                  </div>
                  <select className="bg-gray-800 border border-gray-700 text-white rounded px-3 py-1 text-sm">
                    <option>Day of check-in</option>
                    <option>1 day before</option>
                    <option>2 days before</option>
                    <option>3 days before</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-red-900 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-red-400 mb-4">Notifications Interface Features</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Real-time travel alerts and trip updates</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Customizable notification preferences and delivery methods</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Color-coded notification types (alerts, reminders, confirmations)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Interactive notifications with action buttons</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Unread/read status indicators with filtering options</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Detailed notification content with contextual information</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}