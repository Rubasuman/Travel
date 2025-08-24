import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Star, Camera, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { insertReviewSchema, type InsertReview } from '@shared/schema';
import { z } from 'zod';

const addReviewSchema = insertReviewSchema.extend({
  title: z.string().optional(),
  content: z.string().min(10, 'Review must be at least 10 characters long'),
  rating: z.number().min(1).max(5),
});

type AddReviewForm = z.infer<typeof addReviewSchema>;

interface AddReviewFormProps {
  userId: number;
  hotelId?: number;
  placeId?: number;
  onSuccess?: () => void;
}

export function AddReviewForm({ userId, hotelId, placeId, onSuccess }: AddReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<AddReviewForm>({
    resolver: zodResolver(addReviewSchema),
    defaultValues: {
      userId,
      hotelId: hotelId || undefined,
      placeId: placeId || undefined,
      rating: 0,
      title: '',
      content: '',
      imageUrls: [],
      virtual360Url: '',
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: (data: InsertReview) => apiRequest('/api/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    onSuccess: () => {
      toast({
        title: 'Review submitted',
        description: 'Thank you for your review!',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      form.reset();
      setRating(0);
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to submit review. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: AddReviewForm) => {
    createReviewMutation.mutate({
      ...data,
      rating,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      return (
        <Star
          key={i}
          className={`w-6 h-6 cursor-pointer transition-colors ${
            starValue <= (hoverRating || rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300 hover:text-yellow-200'
          }`}
          onClick={() => {
            setRating(starValue);
            form.setValue('rating', starValue);
          }}
          onMouseEnter={() => setHoverRating(starValue)}
          onMouseLeave={() => setHoverRating(0)}
        />
      );
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Write a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <FormLabel>Rating *</FormLabel>
              <div className="flex items-center gap-1 mt-1">
                {renderStars()}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    {rating} star{rating !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              {form.formState.errors.rating && (
                <p className="text-sm text-destructive mt-1">
                  Please select a rating
                </p>
              )}
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Summarize your experience..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience, what you liked, and any tips for other travelers..."
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
              name="virtual360Url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>360° Photo/Video URL (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="https://example.com/360-tour"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 pt-2">
              <Button
                type="submit"
                disabled={createReviewMutation.isPending || rating === 0}
                className="flex-1"
              >
                {createReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}