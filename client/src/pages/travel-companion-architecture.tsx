import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function TravelCompanionArchitecture() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-white border-red-600 text-gray-800 hover:bg-red-50">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">Travel Companion Architecture</h1>
        
        <p className="text-gray-600 mb-8">
          A comprehensive system architecture showcasing the integration of React frontend and Firebase backend
          services to provide a seamless travel planning and management experience.
        </p>
        
        {/* Abstract Section */}
        <div className="mb-10 p-6 bg-white rounded-lg shadow-md border-l-4 border-red-500">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Abstract</h2>
          <p className="text-gray-700 leading-relaxed">
            In an era characterized by increased global mobility and digital connectivity, effective travel planning remains a significant 
            challenge for modern travelers. The Travel Companion application addresses this need by providing a comprehensive, user-centric 
            platform that simplifies every aspect of trip planning and management. Unlike conventional travel applications that fragment the 
            travel experience across multiple platforms, Travel Companion delivers an integrated solution that unifies destination discovery, 
            itinerary planning, photo management, and real-time notifications.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            Built with React for the frontend and Firebase for backend services, this application offers seamless cross-device synchronization, 
            enabling users to plan trips, manage destinations, create detailed itineraries, upload travel memories, and receive timely notifications. 
            The application's secure authentication system ensures data protection while providing convenient access across multiple devices and 
            potential collaboration opportunities.
          </p>
        </div>
        
        {/* Main Architecture Diagram */}
        <div className="mb-10 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-red-600 border-b pb-3">Travel Companion System Architecture</h2>
          
          {/* Client Layer */}
          <div className="border-2 border-gray-200 rounded-lg p-5 mb-8 bg-gradient-to-r from-gray-50 to-gray-100">
            <h3 className="text-xl font-bold text-center text-black mb-4 pb-2 border-b border-gray-200">Client Layer</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-red-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-red-700 mb-3 text-center border-b pb-2">User Interface</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">React Components</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Responsive Design</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Black & Red Theme</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Shadcn UI Components</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-red-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-red-700 mb-3 text-center border-b pb-2">State Management</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">React Context API</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">TanStack Query</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Local Component State</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Form State Management</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-red-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-red-700 mb-3 text-center border-b pb-2">Routing</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Wouter Routing</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Protected Routes</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Navigation Guards</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Route Parameters</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Connection Arrow */}
          <div className="flex justify-center mb-8">
            <div className="w-0 h-12 border-l-2 border-dashed border-gray-400 relative">
              <div className="absolute -bottom-1 -left-2 w-5 h-5 border-b-2 border-r-2 border-gray-400 transform rotate-45"></div>
            </div>
          </div>
          
          {/* Service Layer */}
          <div className="border-2 border-gray-200 rounded-lg p-5 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h3 className="text-xl font-bold text-center text-blue-800 mb-4 pb-2 border-b border-gray-200">Service Layer</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="border border-blue-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-3 text-center border-b pb-2">Auth Services</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Firebase Authentication</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Email/Password Auth</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Google Authentication</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Auth Persistence</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-blue-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-3 text-center border-b pb-2">Data Services</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Trip Management API</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Destination Services</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Itinerary Services</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Photo Management API</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-blue-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-blue-700 mb-3 text-center border-b pb-2">Notification Services</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Real-time Notifications</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Travel Alerts</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Reminder System</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Notification Center</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Connection Arrow */}
          <div className="flex justify-center mb-8">
            <div className="w-0 h-12 border-l-2 border-dashed border-gray-400 relative">
              <div className="absolute -bottom-1 -left-2 w-5 h-5 border-b-2 border-r-2 border-gray-400 transform rotate-45"></div>
            </div>
          </div>
          
          {/* Data Storage Layer */}
          <div className="border-2 border-gray-200 rounded-lg p-5 mb-8 bg-gradient-to-r from-green-50 to-emerald-50">
            <h3 className="text-xl font-bold text-center text-green-800 mb-4 pb-2 border-b border-gray-200">Data Storage Layer</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-green-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-green-700 mb-3 text-center border-b pb-2">Firebase Firestore</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Collections</h5>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Users</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Trips</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Destinations</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Itineraries</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Notifications</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Features</h5>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Real-time Updates</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Offline Support</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Cross-device Sync</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Transaction Support</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Security Rules</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="border border-green-200 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-green-700 mb-3 text-center border-b pb-2">Firebase Storage</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Content Types</h5>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">User Photos</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Trip Images</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Destination Media</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Document Storage</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Profile Images</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Features</h5>
                    <ul className="space-y-1 text-sm">
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Secure Uploads</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Access Control</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Metadata Support</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">Image Processing</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700">File Management</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Connection Arrow */}
          <div className="flex justify-center mb-8">
            <div className="w-0 h-12 border-l-2 border-dashed border-gray-400 relative">
              <div className="absolute -bottom-1 -left-2 w-5 h-5 border-b-2 border-r-2 border-gray-400 transform rotate-45"></div>
            </div>
          </div>
          
          {/* Infrastructure Layer */}
          <div className="border-2 border-gray-200 rounded-lg p-5 bg-gradient-to-r from-gray-50 to-gray-100">
            <h3 className="text-xl font-bold text-center text-gray-800 mb-4 pb-2 border-b border-gray-200">Infrastructure Layer</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-gray-700 mb-3 text-center border-b pb-2">Firebase Platform</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Google Cloud Infrastructure</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Scalable Backend</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Global CDN</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Security Layer</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-gray-700 mb-3 text-center border-b pb-2">Hosting & Deployment</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Replit Deployment</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Express Backend Server</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Vite Development Server</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">CI/CD Pipeline</span>
                  </li>
                </ul>
              </div>
              
              <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <h4 className="font-semibold text-gray-700 mb-3 text-center border-b pb-2">Security Infrastructure</h4>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Firebase Authentication</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Security Rules</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Data Encryption</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gray-500 rounded-full mr-2"></span>
                    <span className="text-gray-700">Access Control</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Features Section */}
        <div className="mb-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-red-600">Key System Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</span>
                  <div>
                    <span className="font-medium text-gray-900">Real-time Synchronization</span>
                    <p className="text-gray-600 text-sm">All data synchronizes across devices instantly using Firebase's real-time capabilities</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</span>
                  <div>
                    <span className="font-medium text-gray-900">Secure Authentication</span>
                    <p className="text-gray-600 text-sm">Multiple authentication methods with robust security and session management</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</span>
                  <div>
                    <span className="font-medium text-gray-900">Responsive Design</span>
                    <p className="text-gray-600 text-sm">Optimized for all device sizes using responsive design principles</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</span>
                  <div>
                    <span className="font-medium text-gray-900">Comprehensive Trip Management</span>
                    <p className="text-gray-600 text-sm">Complete trip planning with itineraries, destinations, and scheduling</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</span>
                  <div>
                    <span className="font-medium text-gray-900">Photo Management</span>
                    <p className="text-gray-600 text-sm">Upload, store, and organize travel photos with secure cloud storage</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</span>
                  <div>
                    <span className="font-medium text-gray-900">Real-time Notifications</span>
                    <p className="text-gray-600 text-sm">Stay updated with travel alerts and trip reminders through the notification system</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</span>
                  <div>
                    <span className="font-medium text-gray-900">Offline Support</span>
                    <p className="text-gray-600 text-sm">Continue using core features even without internet connectivity</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0">✓</span>
                  <div>
                    <span className="font-medium text-gray-900">Scalable Architecture</span>
                    <p className="text-gray-600 text-sm">Built on Firebase to scale effortlessly with growing user base and data</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Technical Specifications */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-red-600">Technical Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Frontend Technologies</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><span className="font-medium">Framework:</span> React with TypeScript</li>
                <li><span className="font-medium">State Management:</span> Context API, TanStack Query</li>
                <li><span className="font-medium">Routing:</span> Wouter</li>
                <li><span className="font-medium">Form Handling:</span> React Hook Form, Zod</li>
                <li><span className="font-medium">Styling:</span> Tailwind CSS, Shadcn UI</li>
                <li><span className="font-medium">Build Tool:</span> Vite</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Backend Technologies</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><span className="font-medium">Backend Framework:</span> Express.js</li>
                <li><span className="font-medium">Authentication:</span> Firebase Authentication</li>
                <li><span className="font-medium">Database:</span> Firebase Firestore</li>
                <li><span className="font-medium">Storage:</span> Firebase Storage</li>
                <li><span className="font-medium">Hosting:</span> Replit</li>
                <li><span className="font-medium">APIs:</span> RESTful API Architecture</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}