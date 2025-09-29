import type { Review } from '../generated/prisma';
import {
   ReviewsRepository,
   reviewsRepository,
} from '../repositories/reviews.repository';
import { llmProvider, type LlmProvider } from '../providers/llm.provider';

class ReviewService {
   constructor(private readonly llmProvider: LlmProvider) {}

   async getReviews(productId: number): Promise<Review[]> {
      return await reviewsRepository.getReviews(productId);
   }

   async createReview(productId: number): Promise<string> {
      // get the last 10 reviews
      var reviews = await reviewsRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');
      const prompt = `
         Summarize the following customer reviews into a short paragraph
         highlighting key themes, both positive and negative:
         ${joinedReviews}
      `;

      return (
         await this.llmProvider.generateResponse({
            prompt,
            maxOutputTokens: 500,
         })
      ).message;
   }
}

export const reviewService = new ReviewService(llmProvider);
