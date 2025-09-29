import OpenAI from 'openai';
import type { Review } from '../generated/prisma';
import {
   ReviewsRepository,
   reviewsRepository,
} from '../repositories/reviews.repository';

class ReviewService {
   constructor(private readonly openAiClient: OpenAI) {}

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

      const response = await this.openAiClient.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 500,
      });

      return response.output_text;
   }
}

const openAiClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

export const reviewService = new ReviewService(openAiClient);
