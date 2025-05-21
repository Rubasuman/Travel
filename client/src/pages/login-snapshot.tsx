import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function LoginSnapshot() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/ui-snapshots">
          <Button variant="outline" className="flex items-center gap-2 bg-black border-red-700 text-white hover:bg-red-900/20">
            <ArrowLeft size={16} />
            Back to Snapshots
          </Button>
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold mt-6 mb-2 red-gradient-text">User Interface Snapshots</h1>
        <h2 className="text-xl text-gray-400 mb-8">8.1 Login and Authentication</h2>
      </div>
      
      {/* Main content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
          {/* Login Form */}
          <Card className="bg-gray-900 border-red-900 text-white shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center red-gradient-text">Login to TravelEase</CardTitle>
              <CardDescription className="text-gray-400 text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input id="email" placeholder="your.email@example.com" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <a href="#" className="text-sm text-red-400 hover:text-red-300">Forgot Password?</a>
                </div>
                <Input id="password" type="password" placeholder="••••••••" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <Button className="w-full bg-red-700 hover:bg-red-600 text-white">
                Sign In
              </Button>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" className="mr-2">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                  Facebook
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-gray-400 mt-4 w-full">
                Don't have an account?{" "}
                <a href="#" className="text-red-400 hover:text-red-300 font-medium">
                  Sign Up
                </a>
              </p>
            </CardFooter>
          </Card>
          
          {/* Sign Up Form */}
          <Card className="bg-gray-900 border-red-900 text-white shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center red-gradient-text">Create an Account</CardTitle>
              <CardDescription className="text-gray-400 text-center">
                Enter your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name" className="text-gray-300">First Name</Label>
                  <Input id="first-name" placeholder="John" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name" className="text-gray-300">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" className="bg-gray-800 border-gray-700 text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                <Input id="signup-email" placeholder="your.email@example.com" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                <Input id="signup-password" type="password" placeholder="••••••••" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-300">Confirm Password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-red-600" />
                <label htmlFor="terms" className="text-sm text-gray-400">
                  I agree to the <a href="#" className="text-red-400 hover:text-red-300">Terms of Service</a> and <a href="#" className="text-red-400 hover:text-red-300">Privacy Policy</a>
                </label>
              </div>
              <Button className="w-full bg-red-700 hover:bg-red-600 text-white">
                Create Account
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-gray-400 mt-2 w-full">
                Already have an account?{" "}
                <a href="#" className="text-red-400 hover:text-red-300 font-medium">
                  Sign In
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Description */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-900 border border-red-900 rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-red-400 mb-4">Authentication Interface Features</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Secure login with email/password authentication</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Social media integration with Google and Facebook login options</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>User registration with email verification</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Password recovery functionality</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Remember me option for quicker access</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              <span>Secure authentication with Firebase Authentication</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}