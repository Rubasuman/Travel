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
import { useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { insertTripSchema } from "@shared/schema";

const formSchema = insertTripSchema
  .extend({ startDate: z.date(), endDate: z.date() })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });

type FormValues = z.infer<typeof formSchema>;

interface EditTripFormProps {
  trip: any;
  onSuccess?: () => void;
}

export default function EditTripForm({ trip, onSuccess }: EditTripFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // coerce incoming trip dates to Date objects
  const startDate = trip?.startDate ? new Date(trip.startDate) : new Date();
  const endDate = trip?.endDate ? new Date(trip.endDate) : new Date();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: trip?.userId ?? 0,
      destinationId: trip?.destinationId ?? 0,
      title: trip?.title ?? "",
      description: trip?.description ?? "",
      startDate,
      endDate,
      imageUrl: trip?.imageUrl ?? "",
      activities: trip?.activities ?? 0,
      isFavorite: trip?.isFavorite ?? false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const payload = {
        destinationId: parseInt(data.destinationId.toString()),
        title: data.title,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        description: data.description || "",
        imageUrl: data.imageUrl || "",
        activities: data.activities || 0,
        isFavorite: data.isFavorite || false,
      };

      await apiRequest("PATCH", `/api/trips/${trip.id}`, payload);

      toast({
        title: "Trip updated",
        description: "Your trip has been updated successfully.",
      });

      queryClient.invalidateQueries({ queryKey: [`/api/trips/${trip.id}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${trip.userId}/trips`] });

      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error("Error updating trip:", error);
      toast({
        title: "Error",
        description: error?.message ?? "Failed to update trip",
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
                  value={field.value ?? ""}
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
                <Input placeholder="https://example.com/image.jpg" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
