import { useEffect, useState } from 'react';
import { getSellerOrderLIst } from '../api/orderService';
import SellerOrderCard from '../components/OrderList/SellerOrderCard';

export type SellerOrderListType = {
  orderProductId: number;
  productId: number;
  productNameSnapshot: string;
  stockPriceSnapshot: number;
  quantity: number; //주문수량
  amount: number; // 총 금액(구매자가 지불한 금액)
  createdAt: string;
  status: string;
};

const SellerOrderList = () => {
  const [orderList, setOrderList] = useState<SellerOrderListType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getSellerOrderLIst();
        setOrderList(result);
      } catch (error) {
        console.error(error);
        alert('오류가 발생 했습니다.');
      }
    })();
  }, []);

  return (
    <div>
      <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
        <h1 className='flex justify-center text-4xl'>주문내역</h1>
        <div className='mt-7'>
          {orderList.map((list: SellerOrderListType) => {
            return <SellerOrderCard key={list.orderProductId} list={list} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SellerOrderList;
