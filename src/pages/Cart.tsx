import { useNavigate } from 'react-router-dom';
import { getCartItems } from '../api/cartService';
import CartItemCard from '../components/CartItemCard';

export default function Cart() {
  const navigate = useNavigate();

  const cartItems = [
    { id: 1, title: '헬리녹스 노나돔 8인용 쉘터', count: 1, price: 1800000 },
    { id: 2, title: '큐물러스 알래스카 1100 침낭', count: 2, price: 500000 },
    { id: 3, title: '스노우 피크 부탄가스', count: 6, price: 3000 },
    { id: 4, title: '헬리녹스 체어 원 ', count: 1, price: 99000 },
  ];

  const totalPrice = cartItems.reduce((acc, cur) => {
    return acc + cur.count * cur.price;
  }, 0);

  // react-query api 호출
  // const cartItems = getCartItems()

  const orderClick = () => {
    navigate('/order', {
      state: {
        totalPrice: totalPrice,
      },
    });
  };
  return (
    <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
      <h1 className='flex justify-center text-4xl'>장바구니</h1>
      <div className='mt-7'>
        {cartItems?.map((items) => (
          <CartItemCard
            key={items.id}
            id={items.id}
            title={items.title}
            count={items.count}
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
          <span className='flex justify-end mr-3 text-xl'>총 결제금액 : </span>
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
    </div>
  );
}
