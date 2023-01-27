import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCart } from '../../api/cartService';
import { getProductDetail } from '../../api/productsService';
import { getCookie } from '../../store/cookie';

export type ProductDetailType = {
  name: string;
  price: number;
  detailImageUri: string;
  tags: string[];
  avgScore: number;
};

type ProductInfoProps = {
  productId: string;
};

export default function ProductInfo({ productId }: ProductInfoProps) {
  const navigate = useNavigate();
  const { data: product } = useQuery(['productDetail', productId], () =>
    getProductDetail(productId)
  );
  const [quantity, setQuantity] = useState(1);

  return (
    <div className='border-b-2 border-base-200 pb-10 mb-10'>
      <div className='flex items-center max-w-5xl mx-auto'>
        <div className='basis-3/6 mr-10'>
          <img src={product?.detailImageUri} alt={product?.name} />
        </div>
        <div>
          <h2 className='text-3xl mb-3 text-primary font-semibold'>
            {product?.name}
          </h2>
          <p className='text-xl mb-3'>{product?.price.toLocaleString()}원</p>
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
          {getCookie('LoginType') === 'user' && (
            <label
              htmlFor='my-modal'
              className='btn btn-primary'
              onClick={() => addCart(productId, quantity)}
            >
              장바구니 추가
            </label>
          )}
          <input type='checkbox' id='my-modal' className='modal-toggle' />
          <div className='modal'>
            <div className='modal-box'>
              <h3 className='font-bold text-lg'>장바구니에 추가되었습니다.</h3>
              <div className='modal-action'>
                <label
                  htmlFor='my-modal'
                  className='btn btn-primary'
                  onClick={() => navigate('/cart')}
                >
                  장바구니 바로가기
                </label>
                <label htmlFor='my-modal' className='btn'>
                  확인
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
