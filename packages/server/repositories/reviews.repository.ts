import { PrismaClient, type Review } from '../generated/prisma';

export class ReviewsRepository {
   private readonly prisma: PrismaClient;

   constructor(prisma?: PrismaClient) {
      this.prisma = prisma ?? new PrismaClient();
   }
   async getReviews(productId: number, limit?: number): Promise<Review[]> {
      return await this.prisma.review.findMany({
         where: { productId },
         orderBy: { createdAt: 'desc' },
         take: limit,
      });
   }
}

// Singleton instance
export const reviewsRepository = new ReviewsRepository();
