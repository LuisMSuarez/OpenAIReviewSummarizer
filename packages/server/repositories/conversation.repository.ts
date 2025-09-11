export class ConversationRepository {
   // Each chat has a unique conversation id
   // in order to preserve conversation history we use a
   // dictionary to store last responseId given a conversationid
   private readonly conversations = new Map<string, string>();

   /**
    * Retrieves the last response ID associated with a given conversation.
    * @param conversationId The unique identifier of the conversation.
    * @returns The last response ID, or undefined if none exists.
    */
   getLastResponseId(conversationId: string): string | undefined {
      return this.conversations.get(conversationId);
   }

   /**
    * Stores or updates the last response ID for a given conversation.
    * @param conversationId The unique identifier of the conversation.
    * @param responseId The response ID to associate with the conversation.
    */
   setLastResponseId(conversationId: string, responseId: string): void {
      this.conversations.set(conversationId, responseId);
   }
}

// Singleton instance
export const conversationRepository = new ConversationRepository();
