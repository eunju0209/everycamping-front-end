type OrderFormItemCardProps = {
  title: string;
  count: number;
  price: number;
  last?: string;
};

const OrderFormItemCard = ({
  title,
  count,
  price,
  last,
}: OrderFormItemCardProps) => {
  return (
    <div className='flex flex-col items-start m-1'>
      <p className='truncate'>- {title}</p>
      <div className='flex justify-between w-full text-xs mt-1'>
        <p>수량 : {count}</p>
        <p className='whitespace-nowrap'>
          {(count * price).toLocaleString()}원
        </p>
      </div>
      {last ? '' : <div className='divider m-0'></div>}
    </div>
  );
};

export default OrderFormItemCard;
