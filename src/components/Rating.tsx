type RatingProps = {
  score: number;
  id: string;
};

export default function Rating({ score, id }: RatingProps) {
  return (
    <div className='rating rating-half -ml-2'>
      <input type='radio' name={`rating-${id}`} className='rating-hidden' />
      {Array.from({ length: 10 }).map((_, idx) => (
        <input
          key={idx}
          type='radio'
          name={`rating-${id}`}
          className={`cursor-default bg-primary mask mask-star-2 ${
            idx % 2 === 0 ? 'mask-half-1' : 'mask-half-2'
          }`}
          checked={idx + 1 === score * 2}
          disabled
        />
      ))}
    </div>
  );
}
