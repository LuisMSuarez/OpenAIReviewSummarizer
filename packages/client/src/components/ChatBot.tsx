import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { FaArrowUp } from 'react-icons/fa';
import axios from 'axios';
import { useRef, useState } from 'react';
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
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

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

   return (
      <div id="chatArea">
         <div id="messages" className="flex flex-col gap-3 mb-2">
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
            className="flex flex-col gap-2 border-2 p-4 rounded-3xl"
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
