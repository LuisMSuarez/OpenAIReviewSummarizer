import fs from 'fs';
import path from 'path';
import {
   ConversationRepository,
   conversationRepository,
} from '../repositories/conversation.repository';
import template from '../prompts/chatbot.themepark.txt';
import { LlmProvider, llmProvider } from '../providers/llm.provider';

interface ChatResponse {
   id: string;
   message: string;
}

class ChatService {
   constructor(
      private readonly llmProvider: LlmProvider,
      private readonly conversationRepository: ConversationRepository
   ) {}

   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const response = await this.llmProvider.generateResponse({
         prompt,
         instructions,
         previousResponseId:
            this.conversationRepository.getLastResponseId(conversationId),
      });

      this.conversationRepository.setLastResponseId(
         conversationId,
         response.id
      );
      return {
         id: conversationId,
         message: response.message,
      };
   }
}

// Use import.meta.dir for bundler-safe, runtime-resolved path
const parkInfo = fs.readFileSync(
   path.join(import.meta.dir, '..', 'prompts', 'WonderWorld.md'),
   'utf-8'
);
const instructions = template.replace('{{parkInfo}}', parkInfo);

export const chatService = new ChatService(llmProvider, conversationRepository);
