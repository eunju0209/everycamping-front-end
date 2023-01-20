import { useEffect, useRef, useState } from 'react';
import { SellerOrderListType } from '../../pages/SellerOrderList';

type SellerOrderListCardProps = {
  list: SellerOrderListType;
};

const SellerOrderListCard = ({
  list: {
    productId,
    customerId,
    orderProductId,
    imageUriSnapshot,
    productNameSnapshot,
    quantity,
    amount,
    userName,
    phone,
    address,
    status,
    createdAt,
  },
}: SellerOrderListCardProps) => {
  const [orderState, setOrderState] = useState('');
  const labelRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    switchStatus();
  }, []);

  const switchStatus = () => {
    switch (status) {
      case 'COMPLETE':
        setOrderState('주문 완료');
        break;
      case 'CONFIRM':
        setOrderState('구매 확정');
        break;
      case 'CANCEL':
        setOrderState('주문 취소');
        break;
      case 'SETTLEMENT':
        setOrderState('');
        break;
    }
  };
  return (
    <div className='flex rounded bg-white mt-3 p-2'>
      <div className='flex align-center h-40 p-2'>
        <img src={imageUriSnapshot} className='rounded' />
      </div>
      <div className='flex justify-between w-full p-2'>
        <div className='flex flex-col justify-between w-full p-1'>
          <ul>
            <li className='text-xl'>제품명 : {productNameSnapshot}</li>
            <ul className='text-sm'>
              <li>수량 : {quantity}</li>
              <li>주문날짜 : {createdAt}</li>
            </ul>
          </ul>
          <div className='w-full'>
            <ul className='flex justify-between'>
              <li>주문자명 : {userName}</li>
              <li>연락처 : {phone}</li>
              <li>결제금액 : {amount.toLocaleString()}원</li>
            </ul>
            <ul className='flex justify-between'>
              <li>주소 : {address}</li>
            </ul>
          </div>
        </div>
        <div>
          <div className='flex justify-center btn-primary w-24 rounded-lg my-1 p-2'>
            {orderState}
          </div>
        </div>
        {/* <div className='dropdown'>
          <label tabIndex={0} className='btn m-1 min-w-100px'>
            {orderState}
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
            ref={labelRef}
          >
            <li>
              <p
                onClick={() => {
                  setOrderState('주문 확인');
                  labelRef.current ? labelRef.current.blur() : '';
                }}
              >
                주문 확인
              </p>
            </li>
            <li>
              <p
                onClick={() => {
                  setOrderState('배송 준비중');
                  labelRef.current ? labelRef.current.blur() : '';
                }}
              >
                배송 준비중
              </p>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default SellerOrderListCard;
