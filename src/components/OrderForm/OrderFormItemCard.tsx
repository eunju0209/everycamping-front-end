type OrderFormItemCardProps = {
  title: string;
  count: number;
  price: number;
};

const OrderFormItemCard = ({ title, count, price }: OrderFormItemCardProps) => {
  return (
    <div className='flex justify-between flex-nowrap mt-3'>
      <div className='flex items-center'>
        <div className='w-48 truncate mr-2'>- {title}</div>
      </div>
      <div className='flex flex-col items-end w-full'>
        <div className='flex justify-start w-full '>수량 : {count}</div>
        <div>{(count * price).toLocaleString()}원</div>
      </div>
    </div>
  );
};

export default OrderFormItemCard;
