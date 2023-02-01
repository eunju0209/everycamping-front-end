import { useParams } from 'react-router-dom';
import ProductInfo from '../components/Product/ProductInfo';
import ReviewList from '../components/Review/ReviewList';

type ProductDetailParams = {
  id: string;
};

export default function ProductDetail() {
  const { id } = useParams() as ProductDetailParams;
  return (
    <div className='max-w-screen-2xl m-auto px-5'>
      <ProductInfo productId={id} />
      <ReviewList productId={id} />
    </div>
  );
}
