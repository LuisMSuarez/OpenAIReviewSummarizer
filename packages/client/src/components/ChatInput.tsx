import { FaArrowUp } from 'react-icons/fa';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';

export type ChatFormData = {
   prompt: string;
};

interface Props {
   onSubmit: (data: ChatFormData) => void;
}

const ChatInput = ({ onSubmit }: Props) => {
   const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();
   const submit = handleSubmit((data) => {
      reset({ prompt: '' });
      onSubmit(data);
   });
   const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key == 'Enter' && !e.shiftKey) {
         e.preventDefault(); // avoid default behavior of enter key
         submit();
      }
   };

   return (
      <form
         onSubmit={submit}
         onKeyDown={handleKeyDown}
         className="flex flex-0 flex-col gap-2 border-2 p-4 rounded-3xl"
      >
         <textarea
            {...register('prompt', {
               required: true,
               validate: (data) => data.trim().length > 0,
            })}
            autoFocus
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
   );
};

export default ChatInput;
