import { Dispatch, useEffect, useState } from 'react';
import { getSellerOrderDetail } from '../../api/orderService';

type OrderDetailType = {
  orderProductId: number;
  productId: number;
  productNameSnapshot: string;
  stockPriceSnapshot: number;
  imageUriSnapshot: string;
  quantity: number;
  amount: number;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  request: string;
  customerId: number;
  customerEmail: string;
  customerNickName: string;
  customerPhone: string;
  sellerId: number;
  createdAt: string;
  status: string;
};

type SellerOrderDetailProps = {
  id: number;
  popDetail: boolean;
  setPopDetail: Dispatch<React.SetStateAction<boolean>>;
  orderState: string;
};

const SellerOrderDetail = ({
  id,
  popDetail,
  orderState,
  setPopDetail,
}: SellerOrderDetailProps) => {
  const [orderDetail, setOrderDetail] = useState<OrderDetailType>();

  useEffect(() => {
    if (popDetail) {
      (async () => {
        try {
          const result = await getSellerOrderDetail(id);
          setOrderDetail(result);
        } catch (error) {
          alert('오류가 생겼습니다.');
        }
      })();
    }
  }, [popDetail]);

  const popUpDetail = () => {
    setPopDetail(false);
  };
  return (
    <div
      className={`modal ${
        popDetail ? 'visible opacity-100 pointer-events-auto' : ''
      } `}
    >
      <div className='modal-box p-4 border-8'>
        <h3 className='flex justify-center font-bold text-lg'>
          주문 상세 정보
        </h3>
        <div className='flex align-center h-40 p-2'>
          <img src={orderDetail?.imageUriSnapshot} className='rounded' />
        </div>
        <div className='flex justify-between w-full p-2'>
          <div className='flex flex-col justify-between w-full p-1'>
            <ul>
              <li className='text-xl'>
                제품명 : {orderDetail?.productNameSnapshot}
              </li>
              <ul className='text-sm'>
                <li>수량 : {orderDetail?.quantity}</li>
                <li>주문날짜 : {orderDetail?.createdAt}</li>
                <li>상태 : {orderState}</li>
              </ul>
            </ul>
            <div className='flex justify-between w-full mt-5'>
              <ul>
                <h4 className='font-bold text-lg'>배송지 정보</h4>
                <li>수령인 : {orderDetail?.receiverName}</li>
                <li>연락처 : {orderDetail?.receiverPhone}</li>
                <li>주소 : {orderDetail?.receiverAddress}</li>
                <li>요청사항 : {orderDetail?.request}</li>
              </ul>
              <ul>
                <h4 className='font-bold text-lg'>주문자 정보</h4>
                <li>주문자명 : {orderDetail?.customerNickName}</li>
                <li>연락처 : {orderDetail?.customerPhone}</li>
                <li>결제금액 : {orderDetail?.amount.toLocaleString()}원</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='modal-action justify-center'>
          <button className='btn pointer-events-auto' onClick={popUpDetail}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderDetail;
