import { Dispatch, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patchOrderCancel, patchOrderConfirm } from '../../api/orderService';
import { toastSuccess, toastWarn } from '../../util/reactToast';
import { OrderItemsType } from './UserOrderDetail';
import 'react-toastify/dist/ReactToastify.css';

type UserOrderDetailCardProps = {
  itemsDetail: OrderItemsType;
  setPopChat: Dispatch<React.SetStateAction<boolean>>;
  setChatSellerEmail: Dispatch<React.SetStateAction<string>>;
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
  setPopChat,
  setChatSellerEmail,
}: UserOrderDetailCardProps) => {
  const navigate = useNavigate();
  const [itemStatus, setItemStatus] = useState('');
  useEffect(() => {
    switchStatus();
  }, []);

  const orderConfirm = async () => {
    try {
      await patchOrderConfirm(id).then(() => {
        toastSuccess('구매 확정이 완료 되었습니다.');
        setItemStatus('구매 확정');
      });
    } catch (error) {
      console.error(error);
    }
  };

  const orderCancel = async () => {
    try {
      if (status === 'CANCEL') {
        return toastWarn('취소 대상이 아닙니다.');
      }
      await patchOrderCancel(id).then(() => {
        toastSuccess('주문이 취소 되었습니다.');
        setItemStatus('주문 취소');
      });
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

  const reDirectProducts = () => {
    navigate(`/products/detail/${productId}`);
  };

  const writeReview = () => {
    if (itemStatus !== '구매 확정') {
      alert('구매 확정 후 리뷰 작성이 가능 합니다.');
      return;
    }
    navigate('/review/new', {
      state: { productId },
    });
  };

  const chatToSeller = () => {
    setPopChat(true);
    setChatSellerEmail(sellerEmail);
  };

  return (
    <div>
      <div
        className='flex justify-center h-40 mt-4 p-2 bg-white cursor-pointer'
        onClick={reDirectProducts}
      >
        <img src={imageUriSnapshot} className='rounded' />
      </div>
      <div className='flex flex-col justify-between w-full p-2'>
        <div className='flex justify-between p-1 cursor-pointer'>
          <ul>
            <li className='text-xl' onClick={reDirectProducts}>
              {productNameSnapshot}
            </li>
          </ul>
        </div>
        <div className='flex justify-between p-1 select-none'>
          <ul className='text-sm'>
            <li>수량 : {quantity}</li>
            <li>결제금액 : {amount.toLocaleString()}원</li>
            <li>진행상황 : {itemStatus}</li>
          </ul>
          <ul className='flex flex-col justify-end text-sm'>
            <li className='cursor-pointer' onClick={chatToSeller}>
              판매자 : {sellerNickName}
            </li>
            <li>판매자 연락처 : {sellerPhone}</li>
          </ul>
        </div>
        <div className='flex justify-center mt-4'>
          <button
            className='btn btn-primary btn-sm'
            onClick={orderConfirm}
            disabled={
              itemStatus === '주문 취소'
                ? true
                : itemStatus === '구매 확정'
                ? true
                : false
            }
          >
            구매확정
          </button>
          <button
            className='btn btn-primary btn-sm mx-2'
            onClick={writeReview}
            disabled={itemStatus === '주문 취소' ? true : false}
          >
            리뷰작성
          </button>
          <button
            className='btn btn-primary btn-sm'
            onClick={orderCancel}
            disabled={itemStatus === '주문 취소' ? true : false}
          >
            {itemStatus === '주문 취소'
              ? '주문 취소'
              : itemStatus === '주문 완료'
              ? '주문 취소'
              : '환불 요청'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetailCard;
