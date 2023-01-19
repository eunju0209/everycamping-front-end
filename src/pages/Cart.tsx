import { useNavigate } from 'react-router-dom';
import { useGetCartItems } from '../api/cartService';
import CartItemCard from '../components/CartItemCard';

export type cartContentType = {
  imagePath: string;
  isQuantityChanged: boolean;
  name: string;
  onSale: boolean;
  price: number;
  productId: number;
  quantity: number;
};

export default function Cart() {
  const navigate = useNavigate();

  const getCartItemsFunc = () => {
    const res = useGetCartItems();

    if (res.isLoading) {
      return <div></div>;
    }

    if (res.data) {
      const cartItems = res.data;
      const totalPrice = cartItems.reduce(
        (acc: number, cur: cartContentType) => {
          return acc + cur.quantity * cur.price;
        },
        0
      );

      const orderClick = () => {
        navigate('/order', {
          state: {
            orderItems: cartItems,
            totalPrice: totalPrice,
          },
        });
      };
      return (
        <>
          <div className='mt-7'>
            {cartItems?.map((items: cartContentType) => (
              <CartItemCard
                key={items.productId}
                id={items.productId}
                img={items.imagePath}
                title={items.name}
                count={items.quantity}
                price={items.price}
              />
            ))}
          </div>
          <div className='flex justify-end mt-6'>
            <div className='grid grid-cols-2 text-lg'>
              <span className='flex justify-end mr-3'>합계 : </span>
              <span className='flex justify-end'>
                {totalPrice.toLocaleString()}원
              </span>

              <span className='flex justify-end mr-3'>배송비 : </span>
              <span className='flex justify-end'>
                {totalPrice > 70000 ? '0' : '3,000'}원
              </span>
              <div className='divider col-start-1 col-end-3'></div>
              <span className='flex justify-end mr-3 text-xl'>
                총 결제금액 :{' '}
              </span>
              <span className='flex justify-end'>
                {totalPrice > 70000
                  ? totalPrice.toLocaleString()
                  : (totalPrice + 3000).toLocaleString()}
                원
              </span>
            </div>
          </div>
          <div className='flex justify-center mt-10'>
            <button
              className='w-24 p-2 btn btn-primary'
              type='button'
              onClick={orderClick}
            >
              주문하기
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
      <h1 className='flex justify-center text-4xl'>장바구니</h1>
      <div>{getCartItemsFunc()}</div>
    </div>
  );
}
