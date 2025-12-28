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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      // Ensure activities are sorted by time (HH:MM)
      const toMinutes = (t: string | undefined) => {
        const s = String(t || '00:00');
        const m = s.match(/^(\d{1,2}):(\d{2})$/);
        const h = m ? parseInt(m[1], 10) : 0;
        const min = m ? parseInt(m[2], 10) : 0;
        return h * 60 + min;
      };
      const sortedActivities = [...data.activities].sort((a, b) => toMinutes(a.time) - toMinutes(b.time));

      if (existingItinerary) {
        // Update existing itinerary
        await apiRequest("PATCH", `/api/itineraries/${existingItinerary.id}`, {
          activities: sortedActivities,
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
          activities: sortedActivities,
          notes: data.notes,
        });
        
        toast({
          title: "Itinerary created",
          description: `Your Day ${day} itinerary has been created.`,
        });
      }
      
      queryClient.invalidateQueries({ queryKey: [`/api/trips/${tripId}/itineraries`] });
      onSuccess();
    } catch (error: any) {
      // Prefer server-provided message when available
      const serverMessage = (error && error.message) ? String(error.message) : undefined;
      toast({
        title: "Error",
        description: serverMessage ?? "Failed to save itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addActivity = () => {
    append({ time: "", title: "", description: "", location: "" });
  };

  // Add scroll and delete itinerary button
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDelete = async () => {
    if (!existingItinerary) return;
    setIsDeleting(true);
    try {
      await apiRequest("DELETE", `/api/itineraries/${existingItinerary.id}`);
      toast({
        title: "Itinerary deleted",
        description: `Day ${day} itinerary has been deleted.`,
      });
      queryClient.invalidateQueries({ queryKey: [`/api/trips/${tripId}/itineraries`] });
      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
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
                    render={({ field }) => {
                      const TIMES = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
                      return (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(val) => field.onChange(val)}
                              value={field.value || TIMES[9]}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="09:00" />
                              </SelectTrigger>
                              <SelectContent>
                                {TIMES.map((t) => (
                                  <SelectItem key={t} value={t}>{t}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
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
        <div className="flex justify-between gap-2 mt-2">
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onSuccess}>
              Cancel
            </Button>
            {existingItinerary && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Itinerary"}
              </Button>
            )}
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : existingItinerary ? "Update Itinerary" : "Create Itinerary"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
