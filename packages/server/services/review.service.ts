import type { Review } from '../generated/prisma';
import { reviewsRepository } from '../repositories/reviews.repository';

class ReviewService {
   async getReviews(productId: number): Promise<Review[]> {
      return await reviewsRepository.getReviews(productId);
   }
}

export const reviewService = new ReviewService();
