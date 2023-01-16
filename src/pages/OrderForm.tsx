import OrderFormComp from '../components/OrderForm/OrderFormComp';

export default function OrderForm() {
  return (
    <div className='flex flex-col justify-center mx-auto w-96'>
      <p className='flex justify-center text-4xl'>주문서</p>
      <OrderFormComp />
    </div>
  );
}
