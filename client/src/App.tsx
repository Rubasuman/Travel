import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AuthProvider from "@/context/auth-context";
import AuthPage from "@/pages/auth";
import Dashboard from "@/pages/dashboard";
import Destinations from "@/pages/destinations";
import Trips from "@/pages/trips";
import TripDetails from "@/pages/trip-details";
import Gallery from "@/pages/gallery";
import Notifications from "@/pages/notifications";
import FirebaseTest from "@/pages/firebase-test";
import ProtectedRoute from "@/components/auth/protected-route";
import NotFound from "@/pages/not-found";
import Documentation from "@/pages/documentation";
import DocumentationTravel from "@/pages/documentation-travel";
import ArchitecturePage from "@/pages/architecture";
import ArchitectureDetailedPage from "@/pages/architecture-detailed";
import TravelCompanionArchitecture from "@/pages/travel-companion-architecture";
import ArchitectureSingleBox from "@/pages/architecture-single-box";
import UISnapshots from "@/pages/ui-snapshots";
import LoginSnapshot from "@/pages/login-snapshot";
import DashboardSnapshot from "@/pages/dashboard-snapshot";
import TripManagementSnapshot from "@/pages/trip-management-snapshot";
import DestinationsSnapshot from "@/pages/destinations-snapshot";
import ItinerarySnapshot from "@/pages/itinerary-snapshot";
import GallerySnapshot from "@/pages/gallery-snapshot";
import NotificationsSnapshot from "@/pages/notifications-snapshot";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={() => (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      )} />
      <Route path="/destinations" component={() => (
        <ProtectedRoute>
          <Destinations />
        </ProtectedRoute>
      )} />
      <Route path="/trips" component={() => (
        <ProtectedRoute>
          <Trips />
        </ProtectedRoute>
      )} />
      <Route path="/trips/:id" component={({ params }) => (
        <ProtectedRoute>
          <TripDetails id={parseInt(params.id)} />
        </ProtectedRoute>
      )} />
      <Route path="/gallery" component={() => (
        <ProtectedRoute>
          <Gallery />
        </ProtectedRoute>
      )} />
      <Route path="/notifications" component={() => (
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      )} />
      <Route path="/firebase-test" component={() => (
        <ProtectedRoute>
          <FirebaseTest />
        </ProtectedRoute>
      )} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/documentation-travel" component={DocumentationTravel} />
      <Route path="/architecture" component={ArchitecturePage} />
      <Route path="/architecture-detailed" component={ArchitectureDetailedPage} />
      <Route path="/travel-companion-architecture" component={TravelCompanionArchitecture} />
      <Route path="/architecture-single-box" component={ArchitectureSingleBox} />
      
      {/* UI Snapshots Routes */}
      <Route path="/ui-snapshots" component={UISnapshots} />
      <Route path="/login-snapshot" component={LoginSnapshot} />
      <Route path="/dashboard-snapshot" component={DashboardSnapshot} />
      <Route path="/trip-management-snapshot" component={TripManagementSnapshot} />
      <Route path="/destinations-snapshot" component={DestinationsSnapshot} />
      <Route path="/itinerary-snapshot" component={ItinerarySnapshot} />
      <Route path="/gallery-snapshot" component={GallerySnapshot} />
      <Route path="/notifications-snapshot" component={NotificationsSnapshot} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Apply dark theme by default
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
