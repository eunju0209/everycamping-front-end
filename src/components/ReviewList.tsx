import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getReviews } from '../api/productsService';
import ReviewCard from './ReviewCard';

export type ReviewType = {
  id: string;
  customerName: string;
  score: number;
  text: string;
  imageUri: string;
  createdAt: string;
};

type ReviewListProps = {
  productId: string;
};

export default function ReviewList({ productId }: ReviewListProps) {
  const navigate = useNavigate();
  const { data: reviews } = useQuery(['reviews', productId], () =>
    getReviews(productId)
  );
  return (
    <div>
      <div className='relative mb-5'>
        <h2 className='text-3xl font-semibold text-center'>리뷰</h2>
        <button
          className='absolute right-10 top-1 btn btn-sm btn-primary'
          onClick={() => navigate('/review/new')}
        >
          리뷰작성
        </button>
      </div>
      <ul className='grid grid-cols-6 gap-3'>
        {reviews &&
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
      </ul>
    </div>
  );
}
