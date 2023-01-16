import { formatAgo } from '../util/timeago';
import Rating from './Rating';
import { ReviewType } from './ReviewList';

type ReviewCardProps = {
  review: ReviewType;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const { score, id, text, createdAt, customerName, imageUri } = review;
  return (
    <li className='border-2 border-base-200'>
      <div className='flex justify-center'>
        <img className='object-cover h-40' src={imageUri} alt='review' />
      </div>
      <div className='p-2'>
        <Rating score={score} id={id} />
        <p className='text-sm my-2 truncate'>{text}</p>
        <div className='flex justify-between items-center text-gray-500'>
          <span className='text-sm'>{formatAgo(createdAt, 'ko')}</span>
          <span className='text-sm'>{customerName}</span>
        </div>
      </div>
    </li>
  );
}
