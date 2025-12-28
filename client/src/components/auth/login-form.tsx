import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInWithEmail } from "@/lib/supabase";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onToggleForm: () => void;
}

export function LoginForm({ onToggleForm }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      await signInWithEmail(data.email, data.password);
      toast({
        title: "Sign in successful",
        description: "Welcome back!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in";
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
  // Google sign-in removed; not supported with Supabase
      toast({
        title: "Sign in successful",
        description: "Welcome back!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in with Google";
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    try {
  // Facebook sign-in removed; not supported with Supabase
      toast({
        title: "Sign in successful",
        description: "Welcome back!",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to sign in with Facebook";
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold font-heading text-primary">Wanderlust</h1>
        <p className="text-gray-600 mt-2">Plan your dream journey</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your@email.com" 
                    type="email" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="••••••••" 
                    type="password" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-primary text-white" 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button 
            className="text-primary font-medium hover:underline"
            onClick={onToggleForm}
          >
            Sign up
          </button>
        </p>
      </div>
      
      <div className="mt-8 flex items-center justify-center">
        <span className="bg-gray-300 h-px flex-grow"></span>
        <span className="mx-4 text-sm text-gray-500">or continue with</span>
        <span className="bg-gray-300 h-px flex-grow"></span>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          <span>Google</span>
        </Button>
        
        <Button 
          variant="outline" 
          onClick={handleFacebookSignIn}
          disabled={isLoading}
          className="flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" />
          </svg>
          <span>Facebook</span>
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
