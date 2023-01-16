import SellerOrderListCard from '../components/OrderList/SellerOrderListCard';

const SellerOrderList = () => {
  const orderlist = [
    {
      id: 1,
      img: 'https://via.placeholder.com/150',
      productName: '텐트',
      count: 2,
      payPrice: 30000,
      userName: '재재',
      phoneNumber: '010-3558-3752',
      address: '마포구 와우산로 110-12 303호',
      orderDate: '2023-01-14',
    },
    {
      id: 2,
      img: 'https://via.placeholder.com/150',
      productName: '침낭',
      count: 2,
      payPrice: 60000,
      userName: '재재',
      phoneNumber: '010-3558-3752',
      address: '마포구 와우산로 110-12 303호',
      orderDate: '2023-01-14',
    },
    {
      id: 2,
      img: 'https://via.placeholder.com/150',
      productName: '침낭',
      count: 2,
      payPrice: 60000,
      userName: '재재',
      phoneNumber: '010-3558-3752',
      address: '마포구 와우산로 110-12 303호',
      orderDate: '2023-01-14',
    },
    {
      id: 2,
      img: 'https://via.placeholder.com/150',
      productName: '침낭',
      count: 2,
      payPrice: 60000,
      userName: '재재',
      phoneNumber: '010-3558-3752',
      address: '마포구 와우산로 110-12 303호',
      orderDate: '2023-01-14',
    },
    {
      id: 2,
      img: 'https://via.placeholder.com/150',
      productName: '침낭',
      count: 2,
      payPrice: 60000,
      userName: '재재',
      phoneNumber: '010-3558-3752',
      address: '마포구 와우산로 110-12 303호',
      orderDate: '2023-01-14',
    },
  ];

  return (
    <div>
      <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
        <h1 className='flex justify-center text-4xl'>주문내역</h1>
        <div className='mt-7'>
          {orderlist.map((list) => {
            return <SellerOrderListCard key={list.id} list={list} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SellerOrderList;
