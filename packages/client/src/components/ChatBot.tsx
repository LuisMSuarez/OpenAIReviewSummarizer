import axios from 'axios';
import { useRef, useState } from 'react';
import MessageList from './MessageList';
import type { ChatMessage } from '@/entities/ChatMessage';
import ChatInput, { type ChatFormData } from './ChatInput';

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   const [error, setError] = useState<string>('');
   // useRef(...) stores that value in a ref object that persists across re-renders.
   // So conversationId.current will always hold the same UUID for the lifetime of the component.
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setError('');
         setMessages((prev) => [
            ...prev,
            { message: prompt, sender: 'client', state: 'complete' },
         ]); // add user's message

         // inject server 'pending' message
         setMessages((prev) => [
            ...prev,
            { message: '...', sender: 'server', state: 'pending' },
         ]); // using prev syntax to ensure we get latest copy of state
         const { data } = await axios.post<ChatResponse>('/api/chat', {
            prompt,
            conversationId: conversationId.current,
         });
         // add the completed message
         setMessages((prev) => [
            ...prev,
            { message: data.message, sender: 'server', state: 'complete' },
         ]);
      } catch (error) {
         console.error(error);
         setError('Sorry, something went wrong, please try again!');
      } finally {
         // always remove pending message from the server
         setMessages((prev) => [
            ...prev.filter((message) => message.state != 'pending'),
         ]);
      }
   };

   // Messages div use flex-1 and form div uses flex-0 within the parent flex-col chatarea component
   // this means that the messages will grow take up all remaining area that is not required for rendering the form
   // which is pushed to the bottom.
   // The overall height of the chat area is h-full, 100% of the height that its parent will allow
   // in this case, the parent is in app.tsx, where the chatbot is rendered, most likely h-screen, 100% of the viewport height
   // Overflow-y-auto adds a vertical scrollbar only if the content overflows the container’s height.
   // if the content fits, no scrollbar is shown
   return (
      <div id="chatArea" className="flex flex-col h-full w-full">
         <MessageList messages={messages} />
         {error && <p className="text-red-500">{error}</p>}
         <ChatInput onSubmit={onSubmit} />
      </div>
   );
};

export default ChatBot;
