import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productService } from '../services/product.service';

export class ReviewController {
   async getProductReviews(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product id.' });
         return;
      }

      if (!(await productService.getProduct(productId))) {
         res.status(404).json({
            error: `Product with id ${productId} not found.`,
         });
         return;
      }

      const reviews = await reviewService.getReviews(productId);
      const summary = await reviewService.getSummary(productId);
      res.json({
         reviews,
         summary,
      });
   }

   async createSummary(req: Request, res: Response) {
      const productId = Number(req.params.id);
      if (isNaN(productId)) {
         res.status(400).json({ error: 'Invalid product id.' });
         return;
      }
      if (!(await productService.getProduct(productId))) {
         res.status(404).json({
            error: `Product with id ${productId} not found.`,
         });
         return;
      }
      const summary = await reviewService.createSummary(productId);
      if (!summary) {
         res.status(400).json({
            error: `Cannot generate a review summary for product with id ${productId}.`,
         });
         return;
      }

      res.json({ summary });
   }
}

export const reviewController = new ReviewController();
