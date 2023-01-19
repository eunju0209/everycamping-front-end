import { getUserOrderLIst } from '../../api/orderService';
import UserOrderListCard from '../../components/OrderList/UserOrderListCard';

export default function Oders() {
  const orderlist = async () => {
    const result = await getUserOrderLIst();
    return result;
  };
  return (
    <div>
      <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
        <h1 className='flex justify-center text-4xl'>주문내역</h1>
        <div className='mt-7'>
          {orderlist.map((list) => {
            return <UserOrderListCard key={list.id} list={list} />;
          })}
        </div>
      </div>
    </div>
  );
}
