// each chat has a unique conversation id
// in order to preserve conversation history we use a
// dictionary to store last responseId given a conversationid
const conversations = new Map<string, string>();

export const conversationRespository = {
   getLastResponseId(conversationId: string) {
      return conversations.get(conversationId);
   },
   setLastResponseId(conversationId: string, responseId: string) {
      conversations.set(conversationId, responseId);
   },
};
