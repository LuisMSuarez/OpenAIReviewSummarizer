import { PrismaClient, type Review } from '../generated/prisma';

export class ReviewsRepository {
   private readonly prisma: PrismaClient;

   constructor(prisma?: PrismaClient) {
      this.prisma = prisma ?? new PrismaClient();
   }
   async getReviews(productId: number): Promise<Review[]> {
      return await this.prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
      });
   }
}

// Singleton instance
export const reviewsRepository = new ReviewsRepository();
