import { Dispatch } from 'react';
import { UserOrderListType } from '../../pages/User/UserOrderList';

type UserOrderDetailCardProps = {
  popDetail: boolean;
  setPopDetail: Dispatch<React.SetStateAction<boolean>>;
  itemStatus: string;
  orderDetail: UserOrderListType;
};

const UserOrderDetailCard = ({
  popDetail,
  setPopDetail,
  itemStatus,
  orderDetail: {
    productId,
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
}: UserOrderDetailCardProps) => {
  const onClick = () => {
    setPopDetail(false);
  };
  return (
    <div
      className={`modal ${
        popDetail ? 'visible opacity-100 pointer-events-auto' : ''
      } `}
    >
      <div className='modal-box'>
        <h3 className='flex justify-center font-bold text-lg'>
          주문 상세 정보
        </h3>
        <div className='flex rounded bg-white mt-3 p-2'>
          <div className='flex align-center h-40 p-2'>
            <img src={imageUriSnapshot} className='rounded' />
          </div>
          <div className='flex justify-between w-full p-2'>
            <div className='flex flex-col justify-between p-1 cursor-pointer'>
              <ul>
                <li className='text-xl'>제품명 : {productNameSnapshot}</li>
                <ul className='text-sm'>
                  <li>수량 : {quantity}</li>
                  <li>결제금액 : {amount.toLocaleString()}원</li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <ul>
            <li>주문날짜 : {createdAt}</li>
            <li>진행상황 : {itemStatus}</li>
          </ul>
        </div>
        <div className='modal-action'>
          <button className='btn pointer-events-auto' onClick={onClick}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetailCard;
