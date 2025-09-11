import type { Request, Response } from 'express';
import z from 'zod';
import { chatService } from '../services/chat.service';
import { Chat } from 'openai/resources';

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long.'),
   conversationId: z.uuid(),
});

export class ChatController {
   async sendMessage(req: Request, res: Response) {
      const parseResult = chatSchema.safeParse(req.body);
      if (!parseResult.success) {
         res.status(400).json(z.treeifyError(parseResult.error));
      }

      try {
         const { prompt, conversationId } = req.body;
         const response = await chatService.sendMessage(prompt, conversationId);
         res.json({ message: response.message });
      } catch (error) {
         res.status(500).json({ error: 'Failed to generate a response.' });
      }
   }
}

export const chatController = new ChatController();
