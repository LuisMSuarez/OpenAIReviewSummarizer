import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import StarRating from './StarRating';
import { HiSparkles } from 'react-icons/hi2';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { useState } from 'react';

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

const ReviewList = ({ productId }: Props) => {
   const [summaryRegenerated, setSummaryRegenerated] = useState(false);
   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId, summaryRegenerated],
      queryFn: () => fetchReviews(),
   });

   const fetchReviews = async () => {
      const { data } = await axios.get<GetReviewsResponse>(
         `/api/products/${productId}/reviews`
      );
      return data;
   };

   const generateSummary = async () => {
      const { data } = await axios.post<GetReviewsResponse>(
         `/api/products/${productId}/summaries`
      );
      setSummaryRegenerated(true);
      return data;
   };

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((placeholder) => (
               <div key={placeholder}>
                  <Skeleton width={150} /> {/* User name placeholder */}
                  <Skeleton width={100} /> {/* Stars placeholder */}
                  <Skeleton count={2} /> {/* Review placeholder (2-liner) */}
               </div>
            ))}
         </div>
      );
   }

   if (error) {
      return (
         <p className="text-red-500">
            Could not fetch reviews, please try again.
         </p>
      );
   }

   if (!reviewData?.reviews.length) {
      return null;
   }

   return (
      <div>
         <div id="summary" className="mb-5">
            {reviewData?.summary ? (
               <p>{reviewData.summary}</p>
            ) : (
               <Button onClick={generateSummary}>
                  <HiSparkles className="text-yellow-400" />
                  Summarize
               </Button>
            )}
         </div>
         <div id="reviewlist" className="flex flex-col gap-5">
            {reviewData?.reviews.map((review) => (
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
