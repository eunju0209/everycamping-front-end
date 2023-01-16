type UserOrderListCardProps = {
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

const UserOrderListCard = ({
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
}: UserOrderListCardProps) => {
  return (
    <div className='flex rounded bg-white mt-3 p-2'>
      <img src='https://via.placeholder.com/150' className='rounded' />
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
            <li>배송상태 : 배송중</li>
          </ul>
        </div>
        <div className='flex flex-col justify-center'>
          <button className='btn btn-primary btn-sm my-1'>구매확정</button>
          <button className='btn btn-primary btn-sm my-1'>리뷰작성</button>
          <button className='btn btn-primary btn-sm my-1'>
            {'배송준비중' ? '주문취소' : '환불신청'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrderListCard;
