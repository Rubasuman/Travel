import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function ArchitectureDetailedPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-white border-red-500 text-gray-800 hover:bg-red-50">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">TravelEase Detailed Architecture</h1>
        
        <p className="text-gray-600 mb-8">
          This comprehensive diagram illustrates the detailed architecture of the TravelEase application,
          showing all components, services, and their interactions within the system.
        </p>
        
        {/* Main Architecture Container */}
        <div className="architecture-diagram bg-white p-6 border border-gray-200 rounded-lg shadow-md">
          <div className="text-center mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-red-600">TravelEase System Architecture</h2>
            <p className="text-gray-500 mt-2">A detailed view of all system components and their interactions</p>
          </div>
          
          {/* Client Layer */}
          <div className="border-2 border-gray-200 rounded-lg p-4 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-xl font-bold text-center text-blue-800 mb-4 pb-2 border-b border-gray-200">Client Layer</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="border border-blue-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2 text-center">Presentation Components</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-blue-50 rounded">• Dashboard Components</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Trip Management UI</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Destination Cards</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Photo Galleries</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Notification Center</li>
                </ul>
              </div>
              
              <div className="border border-blue-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2 text-center">Form Components</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-blue-50 rounded">• LoginForm / SignupForm</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• AddTripForm</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• ItineraryForm</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• UploadPhotoForm</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Search & Filters</li>
                </ul>
              </div>
              
              <div className="border border-blue-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2 text-center">UI Libraries</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-blue-50 rounded">• Shadcn UI Components</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Tailwind CSS Utilities</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Custom Theme (Black/Red)</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Responsive Layout</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Lucide Icons</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-0 h-6 border-l-2 border-dashed border-gray-400"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-blue-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2 text-center">Pages & Routing</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-blue-50 rounded">• Wouter Router Configuration</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Protected Routes (auth.tsx)</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Public Routes</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Route Parameters</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• 404 Not Found Handling</li>
                </ul>
              </div>
              
              <div className="border border-blue-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-2 text-center">Client State Management</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-blue-50 rounded">• React Context API</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• TanStack Query Cache</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Local Component State</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Form State (React Hook Form)</li>
                  <li className="px-2 py-1 bg-blue-50 rounded">• Toast Notifications</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Connection Arrow */}
          <div className="flex justify-center mb-6">
            <div className="w-0 h-10 border-l-2 border-dashed border-gray-400 relative">
              <div className="absolute -bottom-1 -left-2 w-5 h-5 border-b-2 border-r-2 border-gray-400 transform rotate-45"></div>
            </div>
          </div>
          
          {/* Application Services Layer */}
          <div className="border-2 border-gray-200 rounded-lg p-4 mb-8 bg-gradient-to-r from-purple-50 to-pink-50">
            <h3 className="text-xl font-bold text-center text-purple-800 mb-4 pb-2 border-b border-gray-200">Application Services Layer</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-purple-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-2 text-center">Authentication Services</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-purple-50 rounded">• Firebase Auth Integration</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• Email/Password Auth</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• Google Auth Provider</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• Auth Context Provider</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• Session Management</li>
                </ul>
              </div>
              
              <div className="border border-purple-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-2 text-center">Data Fetching & Mutation</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-purple-50 rounded">• TanStack Query Hooks</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• API Request Utilities</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• Cache Invalidation</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• Optimistic Updates</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• Error Handling</li>
                </ul>
              </div>
              
              <div className="border border-purple-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-purple-700 mb-2 text-center">Validation & Business Logic</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-purple-50 rounded">• Zod Schema Validation</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• Form Validation Logic</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• Trip Planning Logic</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• Itinerary Management</li>
                  <li className="px-2 py-1 bg-purple-50 rounded">• User Permission Checks</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Connection Arrow */}
          <div className="flex justify-center mb-6">
            <div className="w-0 h-10 border-l-2 border-dashed border-gray-400 relative">
              <div className="absolute -bottom-1 -left-2 w-5 h-5 border-b-2 border-r-2 border-gray-400 transform rotate-45"></div>
            </div>
          </div>
          
          {/* Backend Services Layer */}
          <div className="border-2 border-gray-200 rounded-lg p-4 mb-8 bg-gradient-to-r from-green-50 to-teal-50">
            <h3 className="text-xl font-bold text-center text-green-800 mb-4 pb-2 border-b border-gray-200">Backend Services Layer</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="border border-green-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2 text-center">API & Data Services</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-green-50 rounded">• Express API Server</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• API Route Handlers</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Request Validation</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Response Formatting</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Error Handling</li>
                </ul>
              </div>
              
              <div className="border border-green-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2 text-center">Firebase Service APIs</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-green-50 rounded">• Firestore Database API</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Firebase Storage API</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Firebase Auth API</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Cloud Function Integration</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Real-time Updates</li>
                </ul>
              </div>
              
              <div className="border border-green-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2 text-center">Storage Interface</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-green-50 rounded">• IStorage Interface</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• MemStorage Implementation</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• CRUD Operations</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Entity Relationships</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Data Consistency</li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center mb-4">
              <div className="w-0 h-6 border-l-2 border-dashed border-gray-400"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-green-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2 text-center">Data Schema & Models</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-green-50 rounded">• User Schema & Model</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Trip Schema & Model</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Destination Schema & Model</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Photo Schema & Model</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Notification Schema & Model</li>
                </ul>
              </div>
              
              <div className="border border-green-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2 text-center">Server Utilities</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-green-50 rounded">• Logging & Monitoring</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Environment Configuration</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Authentication Middleware</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Error Handling Middleware</li>
                  <li className="px-2 py-1 bg-green-50 rounded">• Static File Serving</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Connection Arrow */}
          <div className="flex justify-center mb-6">
            <div className="w-0 h-10 border-l-2 border-dashed border-gray-400 relative">
              <div className="absolute -bottom-1 -left-2 w-5 h-5 border-b-2 border-r-2 border-gray-400 transform rotate-45"></div>
            </div>
          </div>
          
          {/* Infrastructure Layer */}
          <div className="border-2 border-gray-200 rounded-lg p-4 bg-gradient-to-r from-amber-50 to-orange-50">
            <h3 className="text-xl font-bold text-center text-amber-800 mb-4 pb-2 border-b border-gray-200">Infrastructure Layer</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-amber-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-amber-700 mb-2 text-center">Firebase Infrastructure</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-amber-50 rounded">• Firebase Authentication</li>
                  <li className="px-2 py-1 bg-amber-50 rounded">• Firestore Database</li>
                  <li className="px-2 py-1 bg-amber-50 rounded">• Firebase Storage</li>
                  <li className="px-2 py-1 bg-amber-50 rounded">• Firebase Hosting</li>
                  <li className="px-2 py-1 bg-amber-50 rounded">• Security Rules & Permissions</li>
                </ul>
              </div>
              
              <div className="border border-amber-200 rounded-lg p-3 bg-white shadow-sm">
                <h4 className="font-semibold text-amber-700 mb-2 text-center">Deployment & Runtime</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li className="px-2 py-1 bg-amber-50 rounded">• Replit Deployment</li>
                  <li className="px-2 py-1 bg-amber-50 rounded">• Node.js Runtime</li>
                  <li className="px-2 py-1 bg-amber-50 rounded">• TypeScript Compilation</li>
                  <li className="px-2 py-1 bg-amber-50 rounded">• Vite Dev Server</li>
                  <li className="px-2 py-1 bg-amber-50 rounded">• Express Production Server</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Legend & Technical Notes */}
        <div className="mt-12 p-6 border border-gray-200 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4 text-red-600">Technical Implementation Notes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Technologies</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li><span className="font-medium">Frontend:</span> React, TypeScript, TanStack Query, Zod, Tailwind CSS</li>
                <li><span className="font-medium">Backend:</span> Express.js, Firebase, Firestore</li>
                <li><span className="font-medium">Authentication:</span> Firebase Authentication</li>
                <li><span className="font-medium">Storage:</span> Firebase Storage, Firestore Database</li>
                <li><span className="font-medium">Styling:</span> Tailwind CSS, Shadcn UI Components</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Design Patterns</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li><span className="font-medium">Context API Pattern:</span> Used for global state management</li>
                <li><span className="font-medium">Repository Pattern:</span> Storage interface abstracts data access</li>
                <li><span className="font-medium">Component Composition:</span> Reusable UI components</li>
                <li><span className="font-medium">Container/Presenter Pattern:</span> Separation of logic and UI</li>
                <li><span className="font-medium">Route-based Code Splitting:</span> For optimized performance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}