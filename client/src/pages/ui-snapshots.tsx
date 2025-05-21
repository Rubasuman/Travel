import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function UISnapshots() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="outline" className="flex items-center gap-2 bg-black border-red-700 text-white hover:bg-red-900/20">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-4 red-gradient-text">User Interface Snapshots</h1>
        <p className="text-gray-400 mb-8 max-w-3xl">
          Explore the visual components of the Travel Companion application through these UI snapshots,
          showcasing the key features and interface elements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Login & Authentication */}
          <div className="bg-gray-900 border border-red-900 rounded-lg overflow-hidden hover:shadow-red-900/20 hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-red-900/40 to-black flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 9h10" />
                <path d="M7 13h10" />
                <path d="M7 17h10" />
              </svg>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-red-500 mb-2">8.1 Login & Authentication</h3>
              <p className="text-gray-400 mb-4">
                Secure user authentication with multiple sign-in options and account management.
              </p>
              <Link href="/login-snapshot">
                <Button className="w-full bg-red-900 hover:bg-red-800 text-white">
                  View Interface
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Dashboard */}
          <div className="bg-gray-900 border border-red-900 rounded-lg overflow-hidden hover:shadow-red-900/20 hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-red-900/40 to-black flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <rect width="7" height="9" x="3" y="3" rx="1" />
                <rect width="7" height="5" x="14" y="3" rx="1" />
                <rect width="7" height="9" x="14" y="12" rx="1" />
                <rect width="7" height="5" x="3" y="16" rx="1" />
              </svg>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-red-500 mb-2">8.2 Dashboard</h3>
              <p className="text-gray-400 mb-4">
                User-friendly dashboard with overview of trips, upcoming travel, and quick access to features.
              </p>
              <Link href="/dashboard-snapshot">
                <Button className="w-full bg-red-900 hover:bg-red-800 text-white">
                  View Interface
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Trip Management */}
          <div className="bg-gray-900 border border-red-900 rounded-lg overflow-hidden hover:shadow-red-900/20 hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-red-900/40 to-black flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="M4 19h16" />
                <path d="M4 14h16" />
                <path d="M4 9h16" />
                <path d="M4 4h16" />
              </svg>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-red-500 mb-2">8.3 Trip Management</h3>
              <p className="text-gray-400 mb-4">
                Tools for creating, editing, and organizing trips with date ranges and key details.
              </p>
              <Link href="/trip-management-snapshot">
                <Button className="w-full bg-red-900 hover:bg-red-800 text-white">
                  View Interface
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Destinations */}
          <div className="bg-gray-900 border border-red-900 rounded-lg overflow-hidden hover:shadow-red-900/20 hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-red-900/40 to-black flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-red-500 mb-2">8.4 Destinations</h3>
              <p className="text-gray-400 mb-4">
                Browse and select from a variety of destination options with detailed information.
              </p>
              <Link href="/destinations-snapshot">
                <Button className="w-full bg-red-900 hover:bg-red-800 text-white">
                  View Interface
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Itinerary Builder */}
          <div className="bg-gray-900 border border-red-900 rounded-lg overflow-hidden hover:shadow-red-900/20 hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-red-900/40 to-black flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M9 2h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" />
                <path d="M12 11h4" />
                <path d="M12 16h4" />
                <path d="M8 11h.01" />
                <path d="M8 16h.01" />
              </svg>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-red-500 mb-2">8.5 Itinerary Builder</h3>
              <p className="text-gray-400 mb-4">
                Create detailed day-by-day itineraries with activities, reservations, and locations.
              </p>
              <Link href="/itinerary-snapshot">
                <Button className="w-full bg-red-900 hover:bg-red-800 text-white">
                  View Interface
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Photo Gallery */}
          <div className="bg-gray-900 border border-red-900 rounded-lg overflow-hidden hover:shadow-red-900/20 hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-red-900/40 to-black flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="M17 7h.01" />
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="m4 19 5-5c.928-.893 2.072-.893 3 0l5 5" />
                <path d="m14 14 1-1c.928-.893 2.072-.893 3 0l2 2" />
              </svg>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-red-500 mb-2">8.6 Photo Gallery</h3>
              <p className="text-gray-400 mb-4">
                Upload, organize, and view travel photos with trip association and sharing options.
              </p>
              <Link href="/gallery-snapshot">
                <Button className="w-full bg-red-900 hover:bg-red-800 text-white">
                  View Interface
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Notifications */}
          <div className="bg-gray-900 border border-red-900 rounded-lg overflow-hidden hover:shadow-red-900/20 hover:shadow-lg transition-all">
            <div className="h-48 bg-gradient-to-br from-red-900/40 to-black flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
              </svg>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-red-500 mb-2">8.7 Notifications</h3>
              <p className="text-gray-400 mb-4">
                Stay updated with travel alerts, trip reminders, and application notifications.
              </p>
              <Link href="/notifications-snapshot">
                <Button className="w-full bg-red-900 hover:bg-red-800 text-white">
                  View Interface
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}