import type { Review } from '../generated/prisma';
import {
   ReviewsRepository,
   reviewsRepository,
} from '../repositories/reviews.repository';
import { llmProvider, type LlmProvider } from '../providers/llm.provider';
import template from '../prompts/summarizeReview.txt';

class ReviewService {
   constructor(
      private readonly llmProvider: LlmProvider,
      private readonly reviewsRepository: ReviewsRepository
   ) {}

   async getReviews(productId: number): Promise<Review[]> {
      return await reviewsRepository.getReviews(productId);
   }

   async createReview(productId: number): Promise<string> {
      // get the last 10 reviews
      var reviews = await reviewsRepository.getReviews(productId, 10);
      const joinedReviews = reviews.map((r) => r.content).join('\n\n');
      const prompt = template.replace('{{ reviews }}', joinedReviews);
      const { message: summary } = await this.llmProvider.generateResponse({
         prompt,
         maxOutputTokens: 500,
      });
      await this.reviewsRepository.storeReviewSummary(productId, summary);
      return summary;
   }
}

export const reviewService = new ReviewService(llmProvider, reviewsRepository);
