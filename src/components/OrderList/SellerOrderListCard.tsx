import { useRef, useState } from 'react';

type SellerOrderListCardProps = {
  list: {
    id: number;
    img: string;
    productName: string;
    count: number;
    payPrice: number;
    userName: string;
    phoneNumber: string;
    address: string;
    orderDate: string;
  };
};

const SellerOrderListCard = ({
  list: {
    id,
    img,
    productName,
    count,
    payPrice,
    userName,
    phoneNumber,
    address,
    orderDate,
  },
}: SellerOrderListCardProps) => {
  const [orderState, setOrderState] = useState('--------');
  const labelRef = useRef<HTMLUListElement>(null);

  return (
    <div className='flex rounded bg-white mt-3 p-2'>
      <img src='https://via.placeholder.com/150' className='rounded' />
      <div className='flex justify-between w-full p-2'>
        <div className='flex flex-col justify-between w-full p-1'>
          <ul>
            <li className='text-xl'>제품명 : {productName}</li>
            <ul className='text-sm'>
              <li>수량 : {count}</li>
              <li>주문날짜 : {orderDate}</li>
            </ul>
          </ul>
          <div className='w-full'>
            <ul className='flex justify-between'>
              <li>주문자명 : {userName}</li>
              <li>연락처 : {phoneNumber}</li>
              <li>결제금액 : {payPrice.toLocaleString()}원</li>
            </ul>
            <ul className='flex justify-between'>
              <li>주소 : {address}</li>
            </ul>
          </div>
        </div>
        <div className='dropdown'>
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
        </div>
      </div>
    </div>
  );
};

export default SellerOrderListCard;
