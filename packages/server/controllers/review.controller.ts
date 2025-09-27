import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';

export class ReviewController {
   async getProductReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invlid product id.' });
         return;
      }

      var reviews = await reviewService.getReviews(productId);
      res.json(reviews);
   }

   async createReviewSummary(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invlid product id.' });
         return;
      }
      const summary = await reviewService.createReview(productId);
      res.json({ summary });
   }
}

export const reviewController = new ReviewController();
