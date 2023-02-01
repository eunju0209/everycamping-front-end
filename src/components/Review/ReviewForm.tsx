import { ChangeEvent, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useReviews from '../../hooks/useReviews';

export type NewReviewType = {
  score: number;
  text: string;
};

type RouteState = {
  state: {
    productId: string;
  };
};

export default function ReviewForm() {
  const navigate = useNavigate();
  const {
    state: { productId },
  } = useLocation() as RouteState;
  const [image, setImage] = useState<File>();
  const [review, setReview] = useState({ score: 0, text: '' });
  const { addReviewMutation } = useReviews();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const { files } = e.target as HTMLInputElement;
    if (name === 'image') {
      setImage((files as FileList)[0]);
      return;
    }
    setReview((review) => ({ ...review, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    image &&
      addReviewMutation.mutate(
        { productId, review, image },
        { onSuccess: () => navigate(-1) }
      );
  };

  return (
    <form className='flex flex-col gap-3 items-center' onSubmit={handleSubmit}>
      <input
        type='file'
        name='image'
        className='file-input w-full max-w-xs bg-white'
        accept='image/*'
        required
        onChange={handleChange}
      />
      <label className='input-group w-full max-w-xs'>
        <span className='w-20 justify-center'>평점</span>
        <input
          type='number'
          name='score'
          value={review.score ?? ''}
          min='0'
          max='5'
          step={0.5}
          placeholder='0 ~ 5'
          className='input bg-white w-full'
          required
          onChange={handleChange}
        />
      </label>
      <textarea
        name='text'
        value={review.text ?? ''}
        className='textarea w-full max-w-xs bg-white text-base'
        placeholder='내용'
        required
        onChange={handleChange}
      ></textarea>
      <button type='submit' className='btn btn-wide btn-primary mt-3'>
        등록하기
      </button>
    </form>
  );
}
