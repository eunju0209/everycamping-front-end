import { ChangeEvent, FormEvent, useState } from 'react';
import { addNewReview } from '../api/productsService';

export type NewReviewType = {
  image: string;
  score: string;
  text: string;
};

export default function ReviewForm() {
  const [review, setReview] = useState({ image: '', score: '', text: '' });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReview((review) => ({ ...review, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addNewReview(review);
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
      <input
        type='number'
        name='score'
        value={review.score ?? ''}
        min='0'
        max='5'
        step={0.5}
        placeholder='평점(0 ~ 5)'
        className='input w-full max-w-xs bg-white'
        required
        onChange={handleChange}
      />
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
