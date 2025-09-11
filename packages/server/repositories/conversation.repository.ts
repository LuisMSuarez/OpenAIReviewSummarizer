export class ConversationRepository {
   // Each chat has a unique conversation id
   // in order to preserve conversation history we use a
   // dictionary to store last responseId given a conversationid
   private readonly conversations = new Map<string, string>();

   getLastResponseId(conversationId: string): string | undefined {
      return this.conversations.get(conversationId);
   }

   setLastResponseId(conversationId: string, responseId: string): void {
      this.conversations.set(conversationId, responseId);
   }
}

// Singleton instance
export const conversationRepository = new ConversationRepository();
