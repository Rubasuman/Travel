import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4 border-red-800 bg-black bg-opacity-50 shadow-lg red-border-gradient">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center mb-6 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 red-glow mb-4" />
            <h1 className="text-3xl font-bold red-gradient-text">404 Page Not Found</h1>
            <div className="red-separator w-1/2 my-4"></div>
          </div>

          <p className="mt-4 text-gray-300 text-center mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex justify-center">
            <Link href="/">
              <Button className="bg-red-700 hover:bg-red-800 text-white red-button-glow">
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
