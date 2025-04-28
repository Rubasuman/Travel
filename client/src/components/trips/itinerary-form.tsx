import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, GripVertical } from "lucide-react";

const activitySchema = z.object({
  time: z.string(),
  title: z.string().min(1, "Activity title is required"),
  description: z.string().optional(),
  location: z.string().optional(),
});

const formSchema = z.object({
  activities: z.array(activitySchema).min(1, "Add at least one activity"),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ItineraryFormProps {
  tripId: number;
  day: number;
  date: Date;
  existingItinerary?: any;
  onSuccess: () => void;
}

export default function ItineraryForm({ 
  tripId, 
  day, 
  date, 
  existingItinerary, 
  onSuccess 
}: ItineraryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const defaultActivities = existingItinerary?.activities || [{ time: "09:00", title: "", description: "", location: "" }];
  const defaultNotes = existingItinerary?.notes || "";

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activities: defaultActivities,
      notes: defaultNotes,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "activities",
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      if (existingItinerary) {
        // Update existing itinerary
        await apiRequest("PATCH", `/api/itineraries/${existingItinerary.id}`, {
          activities: data.activities,
          notes: data.notes,
        });
        
        toast({
          title: "Itinerary updated",
          description: `Your Day ${day} itinerary has been updated.`,
        });
      } else {
        // Create new itinerary
        await apiRequest("POST", `/api/itineraries`, {
          tripId,
          day,
          date: date.toISOString(),
          activities: data.activities,
          notes: data.notes,
        });
        
        toast({
          title: "Itinerary created",
          description: `Your Day ${day} itinerary has been created.`,
        });
      }
      
      queryClient.invalidateQueries({ queryKey: [`/api/trips/${tripId}/itineraries`] });
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addActivity = () => {
    append({ time: "", title: "", description: "", location: "" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md relative">
              <div className="absolute left-2 top-2 text-gray-500 cursor-move">
                <GripVertical size={16} />
              </div>
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-2 h-8 w-8 p-0 text-gray-500"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash2 size={16} />
              </Button>
              
              <div className="ml-6 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`activities.${index}.time`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input placeholder="09:00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name={`activities.${index}.title`}
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Activity</FormLabel>
                        <FormControl>
                          <Input placeholder="Breakfast at hotel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name={`activities.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Additional details about this activity"
                          className="resize-none"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`activities.${index}.location`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Address or place name" 
                          {...field}
                          value={field.value || ""} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addActivity}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Activity
          </Button>
        </div>
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Additional notes for this day"
                  className="resize-none"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : existingItinerary ? "Update Itinerary" : "Create Itinerary"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
