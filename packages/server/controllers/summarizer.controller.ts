import type { Request, Response } from 'express';
import { reviewsRepository } from '../repositories/reviews.repository';

export class SummarizerController {
   async getProductReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invlid product id.' });
         return;
      }

      var reviews = await reviewsRepository.getReviews(productId);
      res.json(reviews);
   }
}

export const summarizerController = new SummarizerController();
