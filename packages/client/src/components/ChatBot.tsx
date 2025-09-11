import { Button } from './ui/button';

const ChatBot = () => {
   return (
      <div className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl">
         <textarea className="w-full border-0 focus:outline-0 resize-none" />
         <Button>Send</Button>
      </div>
   );
};

export default ChatBot;
