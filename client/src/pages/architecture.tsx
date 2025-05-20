import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-white border-red-500 text-gray-800 hover:bg-red-50">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-red-600">TravelEase Architecture</h1>
        
        <p className="text-gray-600 mb-8">
          The system architecture of TravelEase shows a clean separation of concerns with distinct layers 
          for presentation, routing, services, and storage. This modular approach enables easier maintenance 
          and future expansion of features.
        </p>
        
        <div className="architecture-diagram bg-white p-6 border border-gray-200 rounded-lg shadow-md">
          {/* Header */}
          <div className="text-center mb-8 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-red-600">TravelEase Architecture Diagram</h2>
          </div>

          {/* Top Layer */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-700 mb-3 text-center">User Interface Layer</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>React Components</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Tailwind CSS</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Shadcn UI</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>Responsive Design</li>
              </ul>
            </div>
            <div className="flex-1 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700 mb-3 text-center">Routing Layer</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Wouter Router</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Protected Routes</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Public Routes</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>Navigation Guards</li>
              </ul>
            </div>
          </div>

          {/* Arrows */}
          <div className="flex justify-center mb-8">
            <div className="w-0 h-10 border-l-2 border-dashed border-gray-400"></div>
          </div>

          {/* Middle Layer */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700 mb-3 text-center">Application Logic Layer</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>React Context API</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>TanStack Query</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>Hooks & Services</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>Zod Validation</li>
              </ul>
            </div>
            <div className="flex-1 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-700 mb-3 text-center">Authentication Layer</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>Firebase Auth</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>Email & Password</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>Google Auth</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>Session Management</li>
              </ul>
            </div>
          </div>

          {/* Arrows */}
          <div className="flex justify-center mb-8">
            <div className="w-0 h-10 border-l-2 border-dashed border-gray-400"></div>
          </div>

          {/* Bottom Layer */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <h3 className="text-lg font-semibold text-orange-700 mb-3 text-center">Data Storage Layer</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>Firebase Firestore</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>Real-time Database</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>Data Models</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-orange-500 rounded-full mr-2"></span>CRUD Operations</li>
              </ul>
            </div>
            <div className="flex-1 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-700 mb-3 text-center">Cloud Services Layer</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Firebase Storage</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Media Management</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Cloud Functions</li>
                <li className="flex items-center"><span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>Analytics & Monitoring</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-6 border border-gray-200 rounded-lg bg-white shadow-md">
          <h2 className="text-xl font-bold mb-4 text-red-600">Architecture Overview</h2>
          <p className="text-gray-700 mb-4">
            TravelEase follows a layered architecture pattern with clear separation between UI components, 
            business logic, and data storage. The frontend is built with React and TypeScript, while the 
            backend leverages Firebase services for a scalable and maintainable application.
          </p>
          
          <p className="text-gray-700 mb-4">
            Key technical decisions include:
          </p>
          
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Using React Context API for global state management</li>
            <li>Implementing Firebase Authentication for secure user management</li>
            <li>Leveraging Firestore for real-time data synchronization</li>
            <li>Utilizing Firebase Storage for media management</li>
            <li>Creating a responsive UI with Tailwind CSS and custom theming</li>
          </ul>
        </div>
      </div>
    </div>
  );
}