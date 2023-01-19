import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patchOrderCancel, patchOrderConfirm } from '../../api/orderService';
import { UserOrderListType } from '../../pages/User/UserOrderList';

type UserOrderListCardProps = {
  list: UserOrderListType;
};

const UserOrderListCard = ({
  list: {
    productId,
    img,
    productName,
    count,
    payPrice,
    userName,
    phoneNumber,
    address,
    status,
    orderDate,
  },
}: UserOrderListCardProps) => {
  const navigate = useNavigate();
  const [itemStatus, setItemStatus] = useState('');

  useEffect(() => {
    setItemStatus(status);
  }, []);

  const orderConfirm = async () => {
    try {
      await patchOrderConfirm(productId);
    } catch (error) {
      console.error(error);
    }
  };
  const orderCancel = async () => {
    try {
      await patchOrderCancel(productId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex rounded bg-white mt-3 p-2'>
      <img src={img} className='rounded' />
      <div className='flex justify-between w-full p-2'>
        <div className='flex flex-col justify-between p-1'>
          <ul>
            <li className='text-xl'>제품명 : {productName}</li>
            <ul className='text-sm'>
              <li>수량 : {count}</li>
              <li>주문날짜 : {orderDate}</li>
            </ul>
          </ul>

          <ul className='flex flex-col'>
            <li>결제금액 : {payPrice.toLocaleString()}원</li>
            <li>진행상황 : {itemStatus}</li>
          </ul>
        </div>
        <div className='flex flex-col justify-center'>
          <button
            className='btn btn-primary btn-sm my-1'
            onClick={orderConfirm}
          >
            구매확정
          </button>
          <button
            className='btn btn-primary btn-sm my-1'
            onClick={() =>
              navigate('/review/new', {
                state: productId,
              })
            }
          >
            리뷰작성
          </button>
          <button className='btn btn-primary btn-sm my-1' onClick={orderCancel}>
            {/* 추후 수정 */}
            {'판매자 확인' || '상품 준비중' ? '주문취소' : '환불요청'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrderListCard;
