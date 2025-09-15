export type ChatMessage = {
   message: string;
   sender: 'client' | 'server';
   state: 'pending' | 'complete';
};
