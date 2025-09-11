import OpenAI from 'openai';
import { conversationRespository } from '../repositories/conversation.repository';

const openAiClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

interface ChatResponse {
   id: string;
   message: string;
}

export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const response = await openAiClient.responses.create({
         model: 'gpt-4o-mini',
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 100,
         previous_response_id:
            conversationRespository.getLastResponseId(conversationId),
      });

      conversationRespository.setLastResponseId(conversationId, response.id);
      return {
         id: conversationId,
         message: response.output_text,
      };
   },
};
