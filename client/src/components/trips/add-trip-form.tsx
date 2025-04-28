import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthContext } from "@/context/auth-context";

// Define our own schema based on the backend requirements
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  destinationId: z.number().min(1, "Please select a destination"),
  startDate: z.date(),
  endDate: z.date(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
}).refine(
  (data) => data.endDate >= data.startDate,
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

type FormValues = z.infer<typeof formSchema>;

interface AddTripFormProps {
  onSuccess?: () => void;
}

export function AddTripForm({ onSuccess }: AddTripFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuthContext();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Use proper typing for destinations
  const { data: destinations } = useQuery<Array<{ 
    id: number; 
    name: string; 
    country: string;
    imageUrl?: string;
  }>>({
    queryKey: ['/api/destinations'],
  });

  // Use proper typing for dbUser
  const { data: dbUser } = useQuery<{ id: number; uid: string; username: string; email: string }>({
    queryKey: [`/api/users/uid/${user?.uid}`],
    enabled: !!user?.uid,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      destinationId: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      description: "",
      imageUrl: "",
    },
    // Ensure we use proper empty values for optional fields
    values: {
      title: "",
      destinationId: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      description: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!dbUser) {
      toast({
        title: "Error",
        description: "You must be logged in to create a trip",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get destination info for the image URL if needed
      const selectedDestination = destinations?.find(dest => dest.id === data.destinationId);

      // Create the server payload
      const payload = {
        userId: dbUser.id,
        destinationId: data.destinationId,
        title: data.title,
        description: data.description || "",
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        imageUrl: data.imageUrl || (selectedDestination ? selectedDestination.imageUrl : ""),
        activities: 0,
        isFavorite: false
      };

      console.log("Submitting trip payload:", payload);
      
      // Call the API
      await apiRequest("POST", "/api/trips", payload);
      
      toast({
        title: "Trip created!",
        description: "Your trip has been successfully created.",
      });
      
      queryClient.invalidateQueries({ queryKey: [`/api/users/${dbUser.id}/trips`] });
      
      if (onSuccess) {
        onSuccess();
      }
      
      form.reset();
    } catch (error) {
      console.error("Error creating trip:", error);
      toast({
        title: "Error",
        description: "Failed to create trip. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Trip Title</FormLabel>
              <FormControl>
                <Input placeholder="Summer Vacation" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="destinationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Destination</FormLabel>
              <Select 
                onValueChange={(value) => field.onChange(parseInt(value))} 
                defaultValue={field.value > 0 ? field.value.toString() : undefined}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {destinations?.map((destination) => (
                    <SelectItem 
                      key={destination.id} 
                      value={destination.id.toString()}
                    >
                      {destination.name}, {destination.country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        type="button"
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      fromDate={form.getValues().startDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your trip plans..." 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com/image.jpg" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Trip..." : "Create Trip"}
        </Button>
      </form>
    </Form>
  );
}

export default AddTripForm;
