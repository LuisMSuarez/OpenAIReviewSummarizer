import dayjs from 'dayjs';
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

   async storeReviewSummary(productId: number, summary: string) {
      const expiresAt = dayjs().add(7, 'days').toDate();
      const upsertObject = {
         content: summary,
         expiresAt: expiresAt,
         createdAt: new Date(),
         productId: productId,
      };

      await this.prisma.reviewSummary.upsert({
         where: { productId },
         create: upsertObject,
         update: upsertObject,
      });
   }
}

// Singleton instance
export const reviewsRepository = new ReviewsRepository();
