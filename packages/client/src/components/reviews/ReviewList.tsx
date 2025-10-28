import axios from 'axios';
import StarRating from './StarRating';
import { HiSparkles } from 'react-icons/hi2';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import { useState } from 'react';
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
   const [summaryRegenerated, setSummaryRegenerated] = useState(false);
   const [generatingSummary, setGeneratingSummary] = useState(false);
   const [summaryGenError, setSummaryGenError] = useState('');

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
      setGeneratingSummary(true);
      setSummaryGenError('');
      try {
         const { data } = await axios.post<SummarizeResponse>(
            `/api/products/${productId}/summaries`
         );
         setSummaryRegenerated(true);
         return data;
      } catch (error) {
         console.error(error);
         setSummaryGenError('Could not summarize the reviews. Try again.');
      } finally {
         setGeneratingSummary(false);
      }
   };

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[1, 2, 3].map((placeholder) => (
               <ReviewSkeleton key={placeholder} />
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
            ) : generatingSummary ? (
               <div>
                  <ReviewSkeleton />
               </div>
            ) : (
               <Button onClick={generateSummary} className="cursor-pointer">
                  <HiSparkles className="text-yellow-400" />
                  Summarize
               </Button>
            )}
            {summaryGenError && (
               <p className="text-red-500">{summaryGenError}</p>
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
