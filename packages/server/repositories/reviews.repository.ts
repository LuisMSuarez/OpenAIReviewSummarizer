import { PrismaClient, type Review } from '../generated/prisma';

export class ReviewsRepository {
   private readonly prisma: PrismaClient;

   constructor(prisma?: PrismaClient) {
      this.prisma = prisma ?? new PrismaClient();
   }
   async getReviews(productId: number): Promise<Review[]> {
      const reviews = await this.prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
      });

      return reviews;
   }
}

// Singleton instance
export const reviewsRepository = new ReviewsRepository();
