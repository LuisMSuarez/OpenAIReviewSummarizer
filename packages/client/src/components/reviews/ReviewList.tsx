import axios from 'axios';
import StarRating from './StarRating';
import { HiSparkles } from 'react-icons/hi2';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import ReviewSkeleton from './ReviewSkeleton';

interface Props {
   productId: number;
}

type Review = {
   id: number;
   author: string;
   content: string;
   rating: number;
   createdAt: string;
};

type GetReviewsResponse = {
   summary: string | null;
   reviews: Review[];
};

type SummarizeResponse = {
   summary: string;
};

const ReviewList = ({ productId }: Props) => {
   const reviewSummaryMutation = useMutation<SummarizeResponse>({
      mutationFn: () => generateSummary(),
   });

   const getReviewsQuery = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId, reviewSummaryMutation.isSuccess],
      queryFn: () => fetchReviews(),
   });

   const fetchReviews = async () => {
      const { data } = await axios.get<GetReviewsResponse>(
         `/api/products/${productId}/reviews`
      );
      return data;
   };

   const generateSummary = async () => {
      const { data } = await axios.post<SummarizeResponse>(
         `/api/products/${productId}/summaries`
      );
      return data;
   };

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
