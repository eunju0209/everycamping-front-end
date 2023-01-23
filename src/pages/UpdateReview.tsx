import { useParams } from 'react-router-dom';
import ReviewUpdateForm from '../components/Review/ReviewUpdateForm';

type UpdateReviewParams = {
  reviewId: string;
};

export default function UpdateReview() {
  const { reviewId } = useParams() as UpdateReviewParams;
  return (
    <>
      <h1 className='text-3xl text-center font-semibold mb-8'>리뷰 수정</h1>
      <ReviewUpdateForm reviewId={reviewId} />
    </>
  );
}
