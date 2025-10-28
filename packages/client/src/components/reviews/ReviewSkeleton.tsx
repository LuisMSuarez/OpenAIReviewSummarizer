import Skeleton from 'react-loading-skeleton';

const ReviewSkeleton = () => {
   return (
      <div>
         <Skeleton width={150} /> {/* User name placeholder */}
         <Skeleton width={100} /> {/* Stars placeholder */}
         <Skeleton count={2} /> {/* Review placeholder (2-liner) */}
      </div>
   );
};

export default ReviewSkeleton;
