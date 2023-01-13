type CartItemCardProps = {
  title: string;
  count: number;
  price: number;
};

const CartItemCard = ({ title, count, price }: CartItemCardProps) => {
  const handleCount = {
    minus: () => {},
    plus: () => {},
  };

  return (
    <div className='flex rounded bg-white mt-3 p-2'>
      <img src='https://via.placeholder.com/150' className='rounded' />
      <div className='flex justify-between w-full p-6'>
        <div className='flex flex-col justify-between'>
          <p className='text-xl'>{title}</p>
          <div className=''>
            <button
              className='btn btn-sm rounded-r-none'
              onClick={handleCount.minus}
            >
              -
            </button>
            <span className='inline-block px-3'>{count}</span>
            <button
              className='btn btn-sm rounded-l-none'
              onClick={handleCount.plus}
            >
              +
            </button>
          </div>
        </div>
        <div className='flex flex-col justify-between relative'>
          <button className='btn btn-xs px-0 w-6 relative left-full bottom-5'>
            x
          </button>
          <p>가격 : {price.toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
