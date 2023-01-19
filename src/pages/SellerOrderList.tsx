import { useEffect, useState } from 'react';
import { getSellerOrderLIst } from '../api/orderService';
import SellerOrderListCard from '../components/OrderList/SellerOrderListCard';

export type SellerOrderListType = {
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

const SellerOrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getSellerOrderLIst();
      console.log(result);
      setOrderList(result);
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
