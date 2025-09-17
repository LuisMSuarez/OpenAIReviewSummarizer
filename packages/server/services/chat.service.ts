import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import {
   ConversationRepository,
   conversationRepository,
} from '../repositories/conversation.repository';
import template from '../prompts/chatbot.themepark.txt';

interface ChatResponse {
   id: string;
   message: string;
}

class ChatService {
   constructor(
      private readonly openAiClient: OpenAI,
      private readonly conversationRepository: ConversationRepository
   ) {}

   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const response = await this.openAiClient.responses.create({
         model: 'gpt-4o-mini',
         instructions,
         input: prompt,
         temperature: 0.2,
         max_output_tokens: 200,
         previous_response_id:
            this.conversationRepository.getLastResponseId(conversationId),
      });

      this.conversationRepository.setLastResponseId(
         conversationId,
         response.id
      );
      return {
         id: conversationId,
         message: response.output_text,
      };
   }
}

const openAiClient = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY,
});

// Use import.meta.dir for bundler-safe, runtime-resolved path
const parkInfo = fs.readFileSync(
   path.join(import.meta.dir, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

export const chatService = new ChatService(
   openAiClient,
   conversationRepository
);
