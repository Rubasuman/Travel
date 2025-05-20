import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function ArchitectureSingleBox() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-white border-red-500 text-gray-800 hover:bg-red-50">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">Travel Companion Architecture</h1>
        
        <p className="text-gray-600 mb-8">
          A simplified architectural overview of the Travel Companion application.
        </p>
        
        {/* Single Architecture Box */}
        <div className="architecture-diagram bg-white p-6 border-2 border-gray-200 rounded-lg shadow-lg mb-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-red-600">Travel Companion System Architecture</h2>
            <p className="text-gray-500 mt-1">Comprehensive Architecture in a Single View</p>
          </div>
          
          <div className="relative p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
            {/* Client Layer (Top) */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-10">
              <h3 className="text-lg font-bold text-blue-700 text-center mb-3 pb-1 border-b border-blue-100">Client Layer</h3>
              <div className="grid grid-cols-3 gap-3 text-sm mb-2">
                <div className="bg-white rounded p-2 shadow-sm border border-blue-100">
                  <h4 className="font-semibold text-blue-600 mb-1 text-center">UI Components</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• React Components</li>
                    <li>• Shadcn UI</li>
                    <li>• Responsive Design</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-2 shadow-sm border border-blue-100">
                  <h4 className="font-semibold text-blue-600 mb-1 text-center">State Management</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• React Context</li>
                    <li>• TanStack Query</li>
                    <li>• Form State</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-2 shadow-sm border border-blue-100">
                  <h4 className="font-semibold text-blue-600 mb-1 text-center">Navigation</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Wouter Router</li>
                    <li>• Protected Routes</li>
                    <li>• Route Guards</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Middle Section - Services & Business Logic */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3">
                <h3 className="text-lg font-bold text-green-700 text-center mb-3 pb-1 border-b border-green-100">Service Layer</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="bg-white rounded p-2 shadow-sm border border-green-100">
                    <h4 className="font-semibold text-green-600 mb-1 text-center">Authentication</h4>
                    <ul className="text-gray-700">
                      <li>• Firebase Auth</li>
                      <li>• Google Login</li>
                      <li>• Email/Password</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded p-2 shadow-sm border border-green-100">
                    <h4 className="font-semibold text-green-600 mb-1 text-center">Trip Services</h4>
                    <ul className="text-gray-700">
                      <li>• Trip Management</li>
                      <li>• Itinerary Planning</li>
                      <li>• Destination Services</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3">
                <h3 className="text-lg font-bold text-purple-700 text-center mb-3 pb-1 border-b border-purple-100">Data Handling</h3>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="bg-white rounded p-2 shadow-sm border border-purple-100">
                    <h4 className="font-semibold text-purple-600 mb-1 text-center">Data Services</h4>
                    <ul className="text-gray-700">
                      <li>• API Requests</li>
                      <li>• Query Caching</li>
                      <li>• Error Handling</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded p-2 shadow-sm border border-purple-100">
                    <h4 className="font-semibold text-purple-600 mb-1 text-center">Media Services</h4>
                    <ul className="text-gray-700">
                      <li>• Photo Management</li>
                      <li>• File Uploads</li>
                      <li>• Image Optimization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom - Data Layer */}
            <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-3 mb-10">
              <h3 className="text-lg font-bold text-amber-700 text-center mb-3 pb-1 border-b border-amber-100">Data Storage Layer</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white rounded p-2 shadow-sm border border-amber-100">
                  <h4 className="font-semibold text-amber-600 mb-1 text-center">Firebase Firestore</h4>
                  <ul className="text-gray-700">
                    <li>• User Data</li>
                    <li>• Trip Collections</li>
                    <li>• Destination Data</li>
                    <li>• Itineraries</li>
                    <li>• Notifications</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-2 shadow-sm border border-amber-100">
                  <h4 className="font-semibold text-amber-600 mb-1 text-center">Firebase Storage</h4>
                  <ul className="text-gray-700">
                    <li>• User Photos</li>
                    <li>• Trip Images</li>
                    <li>• Destination Media</li>
                    <li>• Profile Pictures</li>
                    <li>• Secure Storage</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Infrastructure Layer */}
            <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-3">
              <h3 className="text-lg font-bold text-gray-700 text-center mb-3 pb-1 border-b border-gray-200">Infrastructure</h3>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div className="bg-white rounded p-2 shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-600 mb-1 text-center">Firebase Platform</h4>
                  <ul className="text-gray-700 text-xs">
                    <li>• Authentication</li>
                    <li>• Cloud Database</li>
                    <li>• Storage</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-2 shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-600 mb-1 text-center">Express Backend</h4>
                  <ul className="text-gray-700 text-xs">
                    <li>• API Routes</li>
                    <li>• Middleware</li>
                    <li>• Error Handling</li>
                  </ul>
                </div>
                <div className="bg-white rounded p-2 shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-600 mb-1 text-center">Deployment</h4>
                  <ul className="text-gray-700 text-xs">
                    <li>• Replit Hosting</li>
                    <li>• Vite Bundling</li>
                    <li>• Static Assets</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Connecting Lines */}
            <div className="absolute left-1/2 top-[12%] w-0.5 h-[13%] bg-blue-200 -ml-0.5"></div>
            <div className="absolute left-1/2 top-[37%] w-0.5 h-[13%] bg-purple-200 -ml-0.5"></div>
            <div className="absolute left-1/2 top-[62%] w-0.5 h-[13%] bg-amber-200 -ml-0.5"></div>
          </div>
        </div>
        
        {/* Key Features */}
        <div className="mb-10 p-6 bg-white rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold mb-4 text-red-600">Key System Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Real-time Synchronization</h3>
                  <p className="text-sm text-gray-600">Instant data syncing across all devices</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Comprehensive Trip Planning</h3>
                  <p className="text-sm text-gray-600">Complete travel management solution</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Secure Authentication</h3>
                  <p className="text-sm text-gray-600">Firebase-powered security system</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Photo Management</h3>
                  <p className="text-sm text-gray-600">Secure cloud storage for travel memories</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Responsive Design</h3>
                  <p className="text-sm text-gray-600">Optimized for all device sizes</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-red-100 rounded-full p-1 mr-2 mt-0.5">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-600">Travel alerts and trip reminders</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}