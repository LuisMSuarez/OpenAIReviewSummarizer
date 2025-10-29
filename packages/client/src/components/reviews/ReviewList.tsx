import axios from 'axios';
import StarRating from './StarRating';
import { HiSparkles } from 'react-icons/hi2';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import ReviewSkeleton from './ReviewSkeleton';
import {
   ReviewsApi,
   type GetReviewsResponse,
   type SummarizeResponse,
} from './ReviewsApi';

interface Props {
   productId: number;
}

const ReviewList = ({ productId }: Props) => {
   const reviewSummaryMutation = useMutation<SummarizeResponse>({
      mutationFn: async () => await ReviewsApi.summarizeReviews(productId),
   });

   const getReviewsQuery = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId, reviewSummaryMutation.isSuccess],
      queryFn: async () => await ReviewsApi.fetchReviews(productId),
   });

   if (getReviewsQuery.isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((placeholder) => (
               <ReviewSkeleton key={placeholder} />
            ))}
         </div>
      );
   }

   if (getReviewsQuery.error) {
      return (
         <p className="text-red-500">
            Could not fetch reviews, please try again.
         </p>
      );
   }

   if (!getReviewsQuery.data?.reviews.length) {
      return null;
   }

   return (
      <div>
         <div id="summary" className="mb-5">
            {getReviewsQuery.data?.summary ? (
               <p>{getReviewsQuery.data?.summary}</p>
            ) : reviewSummaryMutation.isPending ? (
               <div>
                  <ReviewSkeleton />
               </div>
            ) : (
               <Button
                  onClick={() => reviewSummaryMutation.mutate()}
                  className="cursor-pointer"
               >
                  <HiSparkles className="text-yellow-400" />
                  Summarize
               </Button>
            )}
            {reviewSummaryMutation.isError && (
               <p className="text-red-500">
                  Could not generate review summary, please try again.
               </p>
            )}
         </div>
         <div id="reviewlist" className="flex flex-col gap-5">
            {getReviewsQuery.data?.reviews.map((review) => (
               <div key={review.id}>
                  <div className="font-semibold">{review.author}</div>
                  <div>
                     <StarRating value={review.rating} />
                  </div>
                  <p className="py-2">{review.content}</p>
               </div>
            ))}
         </div>
      </div>
   );
};

export default ReviewList;
