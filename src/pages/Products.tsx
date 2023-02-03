import { useEffect, useState } from 'react';
import ProductInfiniteList from '../components/Product/ProductInfiniteList';

type ProductsProps = {
  category?: 'ALL' | 'TENT' | 'COOK' | 'ACCESSORY';
};

export default function Products({ category }: ProductsProps) {
  const [filter, setFilter] = useState('createdAt');

  useEffect(() => {
    setFilter('createdAt');
  }, [category]);

  return (
    <div className='max-w-screen-2xl min-h-800px m-auto px-5'>
      {category && (
        <h1 className='text-4xl mb-8 text-center uppercase'>{category}</h1>
      )}
      <div className='text-right mb-3'>
        <select
          className='select max-w-xs bg-white ml-auto'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value='createdAt'>날짜순</option>
          <option value='price'>가격순</option>
          <option value='avgScore'>평점순</option>
        </select>
      </div>
      <ProductInfiniteList category={category} filter={filter} />
    </div>
  );
}
