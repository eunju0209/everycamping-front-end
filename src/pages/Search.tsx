import { useParams } from 'react-router-dom';
import ProductList from '../components/Product/ProductList';

export default function Search() {
  const { keyword } = useParams();

  return (
    <>
      <p className='text-lg text-center mb-8'>
        "<span className='font-bold text-primary'>{keyword}</span>" 검색 결과
      </p>
      <ProductList keyword={keyword} />
    </>
  );
}
