import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Plus, Calendar, MapPin, ChevronRight, Settings, Search, Bell } from 'lucide-react';

export default function DashboardSnapshot() {
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
        <h2 className="text-xl text-gray-400 mb-8">8.2 Dashboard</h2>
      </div>
      
      {/* Dashboard Interface */}
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 rounded-xl border border-red-900 overflow-hidden shadow-xl">
          {/* Top Navigation */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="font-bold text-xl red-gradient-text">TravelEase</div>
              <div className="hidden md:flex space-x-4">
                <button className="text-gray-300 hover:text-white px-2 py-1">Dashboard</button>
                <button className="text-gray-400 hover:text-white px-2 py-1">Trips</button>
                <button className="text-gray-400 hover:text-white px-2 py-1">Destinations</button>
                <button className="text-gray-400 hover:text-white px-2 py-1">Gallery</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-300 hover:text-white rounded-full p-2 hover:bg-gray-800">
                <Search size={20} />
              </button>
              <button className="text-gray-300 hover:text-white rounded-full p-2 hover:bg-gray-800 relative">
                <Bell size={20} />
                <span className="absolute top-1 right-1 bg-red-500 rounded-full w-2 h-2"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                <span className="font-bold">JD</span>
              </div>
            </div>
          </div>
          
          {/* Main Dashboard Content */}
          <div className="p-6">
            {/* Welcome and Overview */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold">Welcome back, John Doe!</h2>
                <p className="text-gray-400">Your next trip to Paris is in 15 days.</p>
              </div>
              <Button className="mt-4 md:mt-0 bg-red-700 hover:bg-red-600 text-white flex items-center gap-2">
                <Plus size={16} />
                Plan New Trip
              </Button>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gray-800 border-gray-700 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Upcoming Trips</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-500">
                      <Calendar size={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Destinations</p>
                      <p className="text-2xl font-bold">12</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-500">
                      <MapPin size={20} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Completed Trips</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Photos Shared</p>
                      <p className="text-2xl font-bold">127</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Upcoming Trips */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Upcoming Trips</h3>
                <Button variant="link" className="text-red-400 hover:text-red-300 flex items-center gap-1 p-0">
                  View All <ChevronRight size={16} />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Trip Card 1 */}
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg overflow-hidden">
                  <div className="h-32 bg-[url('https://images.unsplash.com/photo-1499856871958-5b9357976b82')] bg-cover bg-center relative">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute bottom-2 left-3 bg-red-600 text-white text-xs py-1 px-2 rounded">
                      15 days left
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-lg">Paris, France</h4>
                    <p className="text-gray-400 text-sm">June 15 - June 25, 2025</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-500 mt-1"></span>
                        <span className="text-xs text-gray-400">Itinerary in progress</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                        <Settings size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Trip Card 2 */}
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg overflow-hidden">
                  <div className="h-32 bg-[url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9')] bg-cover bg-center relative">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute bottom-2 left-3 bg-red-600 text-white text-xs py-1 px-2 rounded">
                      48 days left
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-lg">Rome, Italy</h4>
                    <p className="text-gray-400 text-sm">July 18 - July 28, 2025</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 rounded-full bg-green-500 mt-1"></span>
                        <span className="text-xs text-gray-400">Ready to go</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                        <Settings size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Trip Card 3 */}
                <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg overflow-hidden">
                  <div className="h-32 bg-[url('https://images.unsplash.com/photo-1542051841857-5f90071e7989')] bg-cover bg-center relative">
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute bottom-2 left-3 bg-red-600 text-white text-xs py-1 px-2 rounded">
                      97 days left
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-bold text-lg">Tokyo, Japan</h4>
                    <p className="text-gray-400 text-sm">September 5 - September 15, 2025</p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex space-x-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 mt-1"></span>
                        <span className="text-xs text-gray-400">Planning needed</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0">
                        <Settings size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Recent Activity</h3>
                <Button variant="link" className="text-red-400 hover:text-red-300 flex items-center gap-1 p-0">
                  View All <ChevronRight size={16} />
                </Button>
              </div>
              <Card className="bg-gray-800 border-gray-700 shadow-md">
                <CardContent className="p-4">
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors">
                      <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center text-red-500 mt-1 flex-shrink-0">
                        <Calendar size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Hotel reservation confirmed for Paris</p>
                        <p className="text-sm text-gray-400">2 hours ago</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors">
                      <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center text-red-500 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Added museum tickets to Rome itinerary</p>
                        <p className="text-sm text-gray-400">Yesterday</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors">
                      <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center text-red-500 mt-1 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Uploaded 12 photos from Barcelona trip</p>
                        <p className="text-sm text-gray-400">3 days ago</p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3 p-2 hover:bg-gray-700 rounded-md transition-colors">
                      <div className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center text-red-500 mt-1 flex-shrink-0">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="font-medium">Added Tokyo to your wishlist</p>
                        <p className="text-sm text-gray-400">1 week ago</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-red-900 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-red-400 mb-4">Dashboard Interface Features</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Personalized welcome message and trip countdown</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Key statistics overview (upcoming trips, destinations, completed trips, photos)</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Visual cards for upcoming trips with status indicators</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Recent activity feed to track changes and updates</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Quick access navigation to all major application features</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Notification system for important travel alerts and reminders</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}