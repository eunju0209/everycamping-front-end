import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getReviews } from '../../api/reviewService';

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
  productId?: string;
  customerId?: string;
};

export default function ReviewList({ productId, customerId }: ReviewListProps) {
  const navigate = useNavigate();
  // const { data: reviews } = useQuery(['reviews', productId, customerId], () =>
  //   getReviews(productId, customerId)
  // );
  const reviews = [
    {
      id: '1',
      customerName: 'bori',
      score: 1,
      text: '좋아요',
      imageUri: '',
      createdAt: '2023-02-02',
    },
    {
      id: '2',
      customerName: 'bori2',
      score: 2,
      text: '좋아요2',
      imageUri: '',
      createdAt: '2023-02-02',
    },
  ];
  return (
    <div>
      <div className='relative mb-5'>
        <h2 className='text-3xl font-semibold text-center'>리뷰</h2>
        {customerId ? (
          ''
        ) : (
          <button
            className='absolute right-10 top-1 btn btn-sm btn-primary'
            onClick={() => navigate('/review/new')}
          >
            리뷰작성
          </button>
        )}
      </div>
      <ul className='grid grid-cols-6 gap-3'>
        {reviews &&
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              customerId={customerId}
            />
          ))}
      </ul>
    </div>
  );
}
