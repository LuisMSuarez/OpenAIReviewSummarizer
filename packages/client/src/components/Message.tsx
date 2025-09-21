import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Message.css';
import Thinking from './Thinking';
import type { ChatMessage } from '@/entities/ChatMessage';

interface Props {
   message: ChatMessage;
}

const Message = ({ message }: Props) => {
   const { sender, state, message: content } = message;
   const bgColor = sender === 'client' ? 'bg-red-300' : 'bg-blue-300';

   // override default copy behavior to ensure extra line breaks and formatting gets copied
   const onCopyMessage = (e: React.ClipboardEvent) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData('text/plain', selection);
      }
   };
   return (
      <div
         onCopy={onCopyMessage}
         className={`border-2 rounded-3xl p-4 markdown ${bgColor}`}
      >
         {state === 'pending' && <Thinking />}
         {state === 'complete' && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
         )}
      </div>
   );
};

export default Message;
