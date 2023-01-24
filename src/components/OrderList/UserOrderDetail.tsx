import { Dispatch, useEffect, useState } from 'react';
import { getUserOrderDetail } from '../../api/orderService';
import UserOrderDetailCard from './UserOrderDetailCard';

export type OrderItemsType = {
  id: number;
  productId: number;
  productNameSnapshot: string;
  stockPriceSnapshot: number;
  amount: number;
  imageUriSnapshot: string;
  quantity: number;
  status: string;
  sellerId: number;
  sellerNickName: string;
  sellerEmail: string;
  sellerPhone: string;
};

type OrderDetailType = {
  orderProductList: OrderItemsType[];
  orderId: number;
  representProductName: string;
  orderProductCount: number;
  totalAmount: number;
  name: string;
  address: string;
  phone: string;
  request: string;
  customerId: number;
  createdAt: string;
};

type UserOrderDetailProps = {
  id: number;
  popDetail: boolean;
  setPopDetail: Dispatch<React.SetStateAction<boolean>>;
};

const UserOrderDetail = ({
  id,
  popDetail,
  setPopDetail,
}: UserOrderDetailProps) => {
  const [orderItems, setOrderItems] = useState<OrderItemsType[]>([]);
  const [orderDetail, setOrderDetail] = useState<OrderDetailType>();

  useEffect(() => {
    if (popDetail) {
      (async () => {
        try {
          const result = await getUserOrderDetail(id);
          setOrderItems(result.orderProductList);
          setOrderDetail(result);
        } catch (error) {
          console.log(error);
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
      <div className='modal-box scrollbar-hide'>
        <h3 className='flex justify-center font-bold text-lg'>
          주문 상세 정보
        </h3>
        <div>
          {orderItems.map((items) => (
            <UserOrderDetailCard key={items.id} itemsDetail={items} />
          ))}
        </div>
        <div>
          <ul>
            <li>{orderDetail?.createdAt}</li>
            <li>{orderDetail?.orderId}</li>
            <li>
              {orderDetail
                ? orderDetail.orderProductCount > 1
                  ? `${orderDetail.representProductName} 외 ${
                      orderDetail.orderProductCount - 1
                    }건`
                  : orderDetail.representProductName
                : ''}
            </li>
            <li>{orderDetail?.totalAmount}</li>
            <ul>
              <h4 className='font-bold text-lg'>수령인 정보</h4>
              <li>{orderDetail?.name}</li>
              <li>{orderDetail?.address}</li>
              <li>{orderDetail?.phone}</li>
              <li>{orderDetail?.request}</li>
            </ul>
          </ul>
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

export default UserOrderDetail;
