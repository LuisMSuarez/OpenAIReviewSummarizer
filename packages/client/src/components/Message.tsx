import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Message.css';
import type { ChatMessage } from './ChatBot';
import Thinking from './Thinking';

interface Props {
   message: ChatMessage;
}

const Message = ({ message }: Props) => {
   const { sender, state, message: content } = message;
   const bgColor = sender === 'client' ? 'bg-red-300' : 'bg-blue-300';

   return (
      <div className={`border-2 rounded-3xl p-4 max-w-xs markdown ${bgColor}`}>
         {state === 'pending' && <Thinking />}
         {state === 'complete' && (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
         )}
      </div>
   );
};

export default Message;
