import type { ChatMessage } from '@/entities/ChatMessage';
import Message from './Message';
import { useEffect, useRef } from 'react';

interface Props {
   messages: ChatMessage[];
}

const MessageList = ({ messages }: Props) => {
   const lastMessageRef = useRef<HTMLDivElement | null>(null);
   useEffect(() => {
      // As messages are added from the client or server,
      // scroll down to the last message in a smooth transition
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);
   return (
      <div
         id="messages"
         className="flex flex-col flex-1 gap-3 mb-2 overflow-y-auto"
      >
         {messages.map((message, index) => (
            <div
               key={index}
               ref={index == messages.length - 1 ? lastMessageRef : null}
               className={`flex ${message.sender === 'client' ? 'self-start' : 'self-end'}`}
            >
               <Message message={message} />
            </div>
         ))}
      </div>
   );
};

export default MessageList;
