import dayjs from 'dayjs';
import {
   PrismaClient,
   type Review,
   type ReviewSummary,
} from '../generated/prisma';

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

   async upsertReviewSummary(productId: number, summary: string) {
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

   async getReviewSummary(productId: number): Promise<ReviewSummary | null> {
      return await this.prisma.reviewSummary.findUnique({
         where: { productId },
      });
   }
}

// Singleton instance
export const reviewsRepository = new ReviewsRepository();
