import { useEffect, useState } from 'react';
import { getSellerOrderLIst } from '../api/orderService';
import SellerOrderListCard from '../components/OrderList/SellerOrderListCard';

export type SellerOrderListType = {
  productId: number;
  customerId: number;
  orderProductId: number;
  imageUriSnapshot: string;
  productNameSnapshot: string;
  quantity: number; //주문수량
  amount: number; // 총 금액(구매자가 지불한 금액)
  userName: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
};

const SellerOrderList = () => {
  const [orderList, setOrderList] = useState([]);

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
            return <SellerOrderListCard key={list.productId} list={list} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SellerOrderList;
