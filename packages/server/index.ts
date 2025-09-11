import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import z from 'zod';

dotenv.config();

const openAiClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send(process.env.OPENAI_API_KEY);
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello world!' });
});

let lastResponseId: string | null = null;

// each chat has a unique conversation id
// in order to preserve conversation history we use a
// dictionary to store last responseId given a conversationid
const conversations = new Map<string, string>();
const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required.')
      .max(1000, 'Prompt is too long.'),
   conversationId: z.uuid(),
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const parseResult = chatSchema.safeParse(req.body);
   if (!parseResult.success) {
      res.status(400).json(z.treeifyError(parseResult.error));
   }

   try {
      const { prompt, conversationId } = req.body;
      const response = await openAiClient.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id: conversations.get(conversationId),
      });

      conversations.set(conversationId, response.id);

      res.json({ message: response.output_text });
   } catch (error) {
      res.status(500).json({ error: 'Failed to generate a response.' });
   }
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});
