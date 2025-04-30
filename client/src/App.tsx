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
