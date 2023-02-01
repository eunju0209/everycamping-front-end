import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { addCart } from '../../api/cartService';
import { getProductDetail } from '../../api/productsService';
import { getCookie } from '../../store/cookie';
import { toastError } from '../../util/reactToast';
import AddCartModal from './AddCartModal';

export type ProductDetailType = {
  name: string;
  price: number;
  detailImageUri: string;
  tags: string[];
  avgScore: number;
  description: string;
  stock: number;
};

type ProductInfoProps = {
  productId: string;
};

export default function ProductInfo({ productId }: ProductInfoProps) {
  const navigate = useNavigate();
  const { data: product } = useQuery(
    ['productDetail', productId],
    () => getProductDetail(productId),
    { staleTime: 1000 * 60 * 5 }
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddCart, setIsAddCart] = useState(false);

  const handleAddCart = () => {
    if (quantity > product?.stock!) {
      setIsAddCart(false);
      toastError(`재고가 부족합니다. 재고량: ${product?.stock}`);
      return;
    }
    setIsAddCart(true);
    addCart(productId, quantity);
  };

  return (
    <>
      <div className='border-b-2 border-base-200 pb-10 mb-10'>
        <div className='flex flex-col md:flex-row items-center max-w-5xl mx-auto'>
          <div className='md:w-3/6 md:mr-10 mb-3 md:mb-0'>
            <img src={product?.detailImageUri} alt={product?.name} />
          </div>
          <div className='w-full md:w-3/6'>
            <ul className='flex items-center gap-2 mb-2'>
              {product?.tags.map((tag, idx) => (
                <li
                  key={idx}
                  className='badge badge-primary cursor-pointer'
                  onClick={() => navigate(`/products/tag/${tag}`)}
                >
                  #{tag}
                </li>
              ))}
            </ul>
            <h2 className='text-2xl md:text-3xl mb-3 text-primary font-semibold break-all'>
              {product?.name}
            </h2>
            <p className='text-lg md:text-xl mb-3'>
              {product?.price.toLocaleString()}원
            </p>
            {getCookie('LoginType') === 'user' && (
              <>
                <div className='btn-group mb-8 block'>
                  <button
                    className='btn btn-sm btn-active'
                    onClick={() =>
                      setQuantity((prev) => (prev - 1 < 1 ? 1 : prev - 1))
                    }
                  >
                    -
                  </button>
                  <button className='btn btn-sm no-animation btn-ghost cursor-auto bg-white hover:bg-white'>
                    {quantity}
                  </button>
                  <button
                    className='btn btn-sm btn-active'
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <label
                  htmlFor='my-modal'
                  className='btn btn-primary'
                  onClick={handleAddCart}
                >
                  장바구니 추가
                </label>
              </>
            )}
            {isAddCart && <AddCartModal />}
          </div>
        </div>
        <p className='text-lg md:text-center font-semibold mt-10'>
          {product?.description}
        </p>
      </div>
      <ToastContainer />
    </>
  );
}
