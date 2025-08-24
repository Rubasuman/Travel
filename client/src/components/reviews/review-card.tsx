import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Camera, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Review, User } from '@shared/schema';

interface ReviewCardProps {
  review: Review;
  user?: User;
  onView360?: (review: Review) => void;
}

export function ReviewCard({ review, user, onView360 }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.photoURL || undefined} />
              <AvatarFallback>
                {user?.displayName?.charAt(0) || user?.username?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-sm">
                  {user?.displayName || user?.username || 'Anonymous'}
                </h4>
                {review.isVerified && (
                  <Badge variant="secondary" className="text-xs">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>

          {review.virtual360Url && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView360?.(review)}
            >
              <Camera className="w-4 h-4 mr-1" />
              360°
            </Button>
          )}
        </div>

        {review.title && (
          <h5 className="font-medium text-sm mt-2">{review.title}</h5>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3">
          {review.content}
        </p>

        {review.imageUrls && Array.isArray(review.imageUrls) && review.imageUrls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {review.imageUrls.slice(0, 6).map((imageUrl, index) => (
              <div key={index} className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={imageUrl}
                  alt={`Review image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => window.open(imageUrl, '_blank')}
                />
              </div>
            ))}
            {review.imageUrls.length > 6 && (
              <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-sm text-muted-foreground">
                  +{review.imageUrls.length - 6} more
                </span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}