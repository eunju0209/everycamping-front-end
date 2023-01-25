import { useEffect } from 'react';

const Pagination = () => {
  const page = Array(1).fill('page');

  return (
    <div>
      <ul className='flex'>
        {page.map((page, idx) => (
          <li>{idx + 1}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
