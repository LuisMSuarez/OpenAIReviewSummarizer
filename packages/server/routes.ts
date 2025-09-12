import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';

const router = express.Router();

router.get('/api/ping', (req: Request, res: Response) => {
   res.json({ message: 'Success!' });
});

router.post('/api/chat', chatController.sendMessage);

export default router;
