import { useEffect, useState } from 'react';
import { getUserOrderLIst } from '../../api/orderService';
import UserOrderCard from '../../components/OrderList/UserOrderCard';

export type UserOrderType = {
  id: number;
  representProductName: string;
  orderProductCount: number;
  totalAmount: number;
  createdAt: string;
};

export default function UserOrderList() {
  const [orderList, setOrderList] = useState<UserOrderType[]>([]);

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
      <div className='flex flex-col justify-center mx-auto max-w-orderList'>
        <h1 className='flex justify-center text-4xl'>주문내역</h1>
        <div className='mt-7'>
          {orderList.map((list: UserOrderType) => {
            return <UserOrderCard key={list.id} list={list} />;
          })}
        </div>
      </div>
    </div>
  );
}
