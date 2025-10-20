import { FaRegStar, FaStar } from 'react-icons/fa';

interface Props {
   value: number; // rating from 0 to 5
}

const StarRating = ({ value }: Props) => {
   const placeholders: number[] = [1, 2, 3, 4, 5];

   return (
      <div className="flex flex-row gap-1 text-yellow-500">
         {placeholders.map((index) =>
            index <= value ? <FaStar key={index} /> : <FaRegStar key={index} />
         )}
      </div>
   );
};

export default StarRating;
