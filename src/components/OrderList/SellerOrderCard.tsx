import { useEffect, useState } from 'react';
import { SellerOrderListType } from '../../pages/SellerOrderList';
import SellerOrderDetail from './SellerOrderDetailCard';

type SellerOrderListCardProps = {
  list: SellerOrderListType;
};

const SellerOrderListCard = ({
  list: {
    orderProductId,
    productId,
    productNameSnapshot,
    quantity,
    amount,
    createdAt,
    status,
  },
}: SellerOrderListCardProps) => {
  const [orderState, setOrderState] = useState('');
  const [popDetail, setPopDetail] = useState(false);

  useEffect(() => {
    switchStatus();
  }, []);

  const switchStatus = () => {
    switch (status) {
      case 'COMPLETE':
        setOrderState('결제 완료');
        break;
      case 'CONFIRM':
        setOrderState('구매 확정');
        break;
      case 'CANCEL':
        setOrderState('주문 취소');
        break;
      case 'SETTLEMENT':
        setOrderState('결제 완료');
        break;
    }
  };
  const popUpDetail = () => {
    setPopDetail(true);
  };
  return (
    <div className='flex rounded bg-white mt-3 p-2'>
      <div
        className='flex justify-between w-full p-2 cursor-pointer'
        onClick={popUpDetail}
      >
        <div className='flex flex-col justify-between w-full p-1'>
          <ul>
            <li className='text-xl'>제품명 : {productNameSnapshot}</li>
            <ul className='text-sm'>
              <li>수량 : {quantity}</li>
              <li>결제금액 : {amount.toLocaleString()}원</li>
              <li>주문날짜 : {createdAt}</li>
            </ul>
          </ul>
        </div>
        <div className='flex flex-col justify-center'>
          <div className='flex justify-center btn-primary w-24 rounded-lg my-1 p-2'>
            {orderState}
          </div>
        </div>
      </div>
      <SellerOrderDetail
        id={orderProductId}
        popDetail={popDetail}
        setPopDetail={setPopDetail}
        orderState={orderState}
      />
    </div>
  );
};

export default SellerOrderListCard;
