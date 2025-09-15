import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import Message from './Message';

type FormData = {
   prompt: string;
};

export type ChatMessage = {
   message: string;
   sender: 'client' | 'server';
   state: 'pending' | 'complete';
};

type ChatResponse = {
   message: string;
};

const ChatBot = () => {
   const [messages, setMessages] = useState<ChatMessage[]>([]);
   // useRef(...) stores that value in a ref object that persists across re-renders.
   // So conversationId.current will always hold the same UUID for the lifetime of the component.
   const conversationId = useRef(crypto.randomUUID());
   const formRef = useRef<HTMLFormElement | null>(null);
   const { register, handleSubmit, reset, formState } = useForm<FormData>();
   useEffect(() => {
      // scroll down to the form as messages are added both from
      // the client and the server
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);
   const onSubmit = async ({ prompt }: FormData) => {
      setMessages((prev) => [
         ...prev,
         { message: prompt, sender: 'client', state: 'complete' },
      ]); // add user's message
      reset();
      // inject server 'pending' message
      setMessages((prev) => [
         ...prev,
         { message: '...', sender: 'server', state: 'pending' },
      ]); // using prev syntax to ensure we get latest copy of state
      const { data } = await axios.post<ChatResponse>('/api/chat', {
         prompt,
         conversationId: conversationId.current,
      });
      setMessages((prev) => [
         ...prev.filter((message) => message.state != 'pending'),
         { message: data.message, sender: 'server', state: 'complete' },
      ]); // using prev syntax to ensure we get latest copy of state
   };

   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key == 'Enter' && !e.shiftKey) {
         e.preventDefault(); // avoid default behavior of enter key
         handleSubmit(onSubmit)();
      }
   };

   // Messages div use flex-1 and form div uses flex-0 within the parent flex-col chatarea component
   // this means that the messages will grow take up all remaining area that is not required for rendering the form
   // which is pushed to the bottom.
   // The overall height of the chat area is h-full, 100% of the height that its parent will allow
   // in this case, the parent is in app.tsx, where the chatbot is rendered, most likely h-screen, 100% of the viewport height
   return (
      <div id="chatArea" className="flex flex-col h-full">
         <div id="messages" className="flex flex-col flex-1 gap-3 mb-2">
            {messages.map((message, index) => (
               <div
                  key={index}
                  className={`flex ${message.sender === 'client' ? 'self-start' : 'self-end'}`}
               >
                  <Message message={message} />
               </div>
            ))}
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}
            ref={formRef}
            className="flex flex-0 flex-col gap-2 border-2 p-4 rounded-3xl"
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (data) => data.trim().length > 0,
               })}
               className="w-full border-0 focus:outline-0 resize-none"
               placeholder="Ask anything"
               maxLength={1000}
            />

            <Button
               type="submit"
               disabled={!formState.isValid}
               className="rounded-full w-9 h-9 self-end"
            >
               <FaArrowUp />
            </Button>
         </form>
      </div>
   );
};

export default ChatBot;
