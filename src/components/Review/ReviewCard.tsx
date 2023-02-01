import { useNavigate } from 'react-router-dom';
import useReviews from '../../hooks/useReviews';
import { formatAgo } from '../../util/timeago';
import Rating from './Rating';
import { ReviewType } from './ReviewList';

type ReviewCardProps = {
  review: ReviewType;
  customerId?: number;
};

export default function ReviewCard({ review, customerId }: ReviewCardProps) {
  const navigate = useNavigate();
  const { score, id, text, createdAt, customerName, imageUri } = review;
  const { deleteReviewMutation } = useReviews();

  return (
    <li className='border-2 border-base-200'>
      <div className='flex justify-center'>
        <img className='object-contain h-40' src={imageUri} alt='review' />
      </div>
      <div className='p-2'>
        <Rating score={score} id={id} />
        <p className='text-sm my-2 truncate'>{text}</p>
        <div className='flex justify-between items-center text-gray-500 mb-2'>
          <span className='text-sm'>{formatAgo(createdAt, 'ko')}</span>
          <span className='text-sm'>{customerName}</span>
        </div>
        {customerId && (
          <div>
            <button
              className='btn btn-sm mr-2'
              onClick={() => deleteReviewMutation.mutate({ id })}
            >
              삭제하기
            </button>
            <button
              className='btn btn-sm'
              onClick={() => navigate(`/reviews/update/${id}`)}
            >
              수정하기
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
