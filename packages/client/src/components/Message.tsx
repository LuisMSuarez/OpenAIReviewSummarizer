import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Message.css';

type ChatMessage = {
   message: string;
   sender: 'client' | 'server';
};

interface Props {
   message: ChatMessage;
}

const Message = ({ message }: Props) => {
   const isClient = message.sender === 'client';
   return (
      <div
         className={`
            ${isClient ? 'bg-red-300' : 'bg-blue-300'}
            border-2 rounded-3xl p-4 max-w-xs markdown
         `}
      >
         <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.message}
         </ReactMarkdown>
      </div>
   );
};

export default Message;
