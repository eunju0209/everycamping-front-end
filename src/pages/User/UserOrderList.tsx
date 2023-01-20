import { useEffect, useState } from 'react';
import { getUserOrderLIst } from '../../api/orderService';
import UserOrderListCard from '../../components/OrderList/UserOrderListCard';

// String address //배송지 주소
// String phone //수령자 연락처
// Long productId //상품id
// String productNameSnapshot // 주문 시 상품명
// Integer stockPriceSnapshot // 주문 시 개당 가격
// String imageUriSnapshot // 주문 시 상품 이미지 url
// Long orderProductId //주문상품id (주문확정, 주문취소 시 필요)
// Integer quantity //주문수량
// Integer amount // 총 금액
// OrderStatus status //주문 상태 (COMPLETE|CONFIRM|CANCEL|SETTLEMENT)
// LocalDateTime createdAt : 주문 일자

export type UserOrderListType = {
  productId: number;
  orderProductId: number;
  imageUriSnapshot: string;
  productNameSnapshot: string;
  quantity: number;
  amount: number;
  userName: string;
  phone: string;
  address: string;
  status: string;
  createdAt: string;
};

export default function UserOrderList() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getUserOrderLIst();
        setOrderList(result);
      } catch (error) {
        console.log(error);
        alert('오류가 생겼습니다.');
      }
    })();
  }, []);

  return (
    <div>
      <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
        <h1 className='flex justify-center text-4xl'>주문내역</h1>
        <div className='mt-7'>
          {orderList.map((list: UserOrderListType) => {
            return <UserOrderListCard key={list.productId} list={list} />;
          })}
        </div>
      </div>
    </div>
  );
}
