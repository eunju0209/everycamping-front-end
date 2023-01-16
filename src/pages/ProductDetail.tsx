import { useLocation } from 'react-router-dom';
import ProductInfo from '../components/ProductInfo';
import ReviewList from '../components/ReviewList';

type RouteState = {
  state: {
    id: string;
  };
};

export default function ProductDetail() {
  const {
    state: { id },
  } = useLocation() as RouteState;
  return (
    <>
      <ProductInfo productId={id} />
      <ReviewList productId={id} />
    </>
  );
}
