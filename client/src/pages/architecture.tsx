import React from 'react';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';

export default function ArchitecturePage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2 bg-black border-red-700 text-white hover:bg-red-900/20">
              <ArrowLeft size={16} />
              Back to Home
            </Button>
          </Link>
        </div>
      
        <h1 className="text-3xl md:text-4xl font-bold mb-2 red-gradient-text">TravelEase Architecture</h1>
        
        <p className="text-gray-300 mb-8">
          The system architecture of TravelEase shows a clean separation of concerns with distinct layers 
          for presentation, routing, services, and storage. This modular approach enables easier maintenance 
          and future expansion of features.
        </p>
        
        <ArchitectureDiagram />
        
        <div className="mt-12 p-6 border border-red-900 rounded-lg bg-black bg-opacity-60">
          <h2 className="text-xl font-bold mb-4 text-red-400">Architecture Overview</h2>
          <p className="text-gray-300 mb-4">
            TravelEase follows a layered architecture pattern with clear separation between UI components, 
            business logic, and data storage. The frontend is built with React and TypeScript, while the 
            backend leverages Firebase services.
          </p>
          
          <p className="text-gray-300 mb-4">
            Key technical decisions include:
          </p>
          
          <ul className="list-disc pl-5 text-gray-300 space-y-2">
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
};

export default ArchitecturePage;