import { getSellerOrderLIst } from '../api/orderService';
import SellerOrderListCard from '../components/OrderList/SellerOrderListCard';

const SellerOrderList = () => {
  // const orderlist = async () => {
  //   const result = await getSellerOrderLIst();
  //   console.log(result);
  //   return result;
  // };
  const result = getSellerOrderLIst();
  console.log(result);
  // orderlist();

  return (
    <div>
      <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
        <h1 className='flex justify-center text-4xl'>주문내역</h1>
        <div className='mt-7'>
          {/* {orderlist.map((list) => {
            return <SellerOrderListCard key={list.id} list={list} />;
          })} */}
        </div>
      </div>
    </div>
  );
};

export default SellerOrderList;
