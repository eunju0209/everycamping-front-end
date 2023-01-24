import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patchOrderCancel, patchOrderConfirm } from '../../api/orderService';
import { OrderItemsType } from './UserOrderDetail';

type UserOrderDetailCardProps = {
  itemsDetail: OrderItemsType;
};

const UserOrderDetailCard = ({
  itemsDetail: {
    id,
    productId,
    stockPriceSnapshot,
    imageUriSnapshot,
    productNameSnapshot,
    quantity,
    amount,
    status,
    sellerId,
    sellerNickName,
    sellerEmail,
    sellerPhone,
  },
}: UserOrderDetailCardProps) => {
  const navigate = useNavigate();
  const [itemStatus, setItemStatus] = useState('');
  useEffect(() => {
    switchStatus();
  }, []);

  const orderConfirm = async () => {
    try {
      if (status !== 'COMPLETE') {
        return alert('구매 확정 대상이 아닙니다.');
      }
      await patchOrderConfirm(id).then(() =>
        alert('구매 확정이 완료 되었습니다.')
      );
    } catch (error) {
      console.error(error);
    }
  };
  const orderCancel = async () => {
    try {
      if (status === 'CANCEL') {
        return alert('취소 대상이 아닙니다.');
      }
      await patchOrderCancel(id).then(() => alert('주문이 취소 되었습니다.'));
    } catch (error) {
      console.error(error);
    }
  };
  const switchStatus = () => {
    switch (status) {
      case 'COMPLETE':
        setItemStatus('주문 완료');
        break;
      case 'CONFIRM':
        setItemStatus('구매 확정');
        break;
      case 'CANCEL':
        setItemStatus('주문 취소');
        break;
      case 'SETTLEMENT':
        setItemStatus('구매 확정');
        break;
    }
  };
  return (
    <div>
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
              <li>진행상황 : {itemStatus}</li>
            </ul>
          </ul>
        </div>
        <div className='flex flex-col justify-between p-1 cursor-pointer'>
          <ul className='text-sm'>
            <li>판매자 : {sellerNickName}</li>
            <li>판매자 연락처 : {sellerPhone}</li>
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
            {status !== 'COMPLETE' ? '환불요청' : '주문취소'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetailCard;
