import { useParams } from 'react-router-dom';
import ProductUpdateForm from '../components/Product/ProductUpdateForm';

type UpdateProductParams = {
  productId: string;
};

export default function UpdateProduct() {
  const { productId } = useParams() as UpdateProductParams;
  return (
    <>
      <h1 className='text-3xl text-center font-semibold mb-8'>제품 수정</h1>
      <ProductUpdateForm productId={productId} />
    </>
  );
}
