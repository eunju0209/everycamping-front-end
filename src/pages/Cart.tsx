import { useNavigate } from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';

export default function Cart() {
  const navigate = useNavigate();
  const cartList = [
    {
      title: '텐트',
      count: 1,
      price: 1000000,
    },
    {
      title: '침낭',
      count: 2,
      price: 500000,
    },
    {
      title: '부탄가스',
      count: 10,
      price: 15000,
    },
  ];

  const orderClick = () => {
    navigate('/order');
  };
  return (
    <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
      <h1 className='flex justify-center text-4xl'>장바구니</h1>
      <div className='mt-7'>
        {cartList.map((items, idx) => (
          <CartItemCard
            key={items.title + idx}
            title={items.title}
            count={items.count}
            price={items.price}
          />
        ))}
      </div>
      {/* <div className='overflow-x-auto'>
        <table className='table w-full'>
          <tbody>
            <tr>
              <th>총 금액</th>
              <td className='text-right'>{}</td>
            </tr>
          </tbody>
        </table>
      </div> */}
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
