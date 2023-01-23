import { useState } from 'react';
import { UserOrderType } from '../../pages/User/UserOrderList';
import UserOrderDetail from './UserOrderDetail';

type UserOrderListCardProps = {
  list: UserOrderType;
};

const UserOrderListCard = ({
  list: { id, representProductName, orderProductCount, totalAmount, createdAt },
}: UserOrderListCardProps) => {
  const [popDetail, setPopDetail] = useState(false);

  const popUpDetail = () => {
    setPopDetail(true);
  };

  return (
    <div className='flex rounded bg-white mt-3 p-2'>
      <div
        className='flex justify-between w-full p-2 cursor-pointer'
        onClick={popUpDetail}
      >
        <div className='flex justify-between w-full p-1'>
          <ul>
            <li className='text-sm'>주문번호 : {id}</li>
            <li className='text-sm'>주문날짜 : {createdAt}</li>
            <li className='text-xl'>
              {orderProductCount > 1
                ? `${representProductName} 외 ${orderProductCount - 1}건`
                : representProductName}
            </li>
          </ul>
          <ul className='flex flex-col justify-end'>
            <li>주문금액 : {totalAmount.toLocaleString()}원</li>
          </ul>
        </div>
      </div>
      <UserOrderDetail
        id={id}
        popDetail={popDetail}
        setPopDetail={setPopDetail}
      />
    </div>
  );
};

export default UserOrderListCard;
