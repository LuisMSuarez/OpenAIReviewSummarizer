import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { summarizerController } from './controllers/summarizer.controller';

const router = express.Router();

router.get('/api/ping', (req: Request, res: Response) => {
   res.json({ message: 'Success!' });
});

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', summarizerController.getProductReviews);

export default router;
