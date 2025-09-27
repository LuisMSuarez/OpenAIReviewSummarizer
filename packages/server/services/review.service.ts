import type { Review } from '../generated/prisma';
import {
   ReviewsRepository,
   reviewsRepository,
} from '../repositories/reviews.repository';

class ReviewService {
   async getReviews(productId: number): Promise<Review[]> {
      return await reviewsRepository.getReviews(productId);
   }

   async createReview(productId: number): Promise<string> {
      // get the last 10 reviews
      var reviews = await reviewsRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');

      // stub: return canned response
      const summary = 'This is a placeholder summary';
      return summary;
   }
}

export const reviewService = new ReviewService();
