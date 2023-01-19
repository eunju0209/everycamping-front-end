import { useEffect, useState } from 'react';
import { getUserOrderLIst } from '../../api/orderService';
import UserOrderListCard from '../../components/OrderList/UserOrderListCard';

export type UserOrderListType = {
  productId: number;
  img: string;
  productName: string;
  count: number;
  payPrice: number;
  userName: string;
  phoneNumber: string;
  address: string;
  status: string;
  orderDate: string;
};

export default function UserOrderList() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getUserOrderLIst();
        setOrderList(result);
      } catch (error) {
        console.log(error);
        alert('오류가 생겼습니다.');
      }
    })();
  }, []);

  return (
    <div>
      <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
        <h1 className='flex justify-center text-4xl'>주문내역</h1>
        <div className='mt-7'>
          {orderList.map((list: UserOrderListType) => {
            return <UserOrderListCard key={list.productId} list={list} />;
          })}
        </div>
      </div>
    </div>
  );
}
