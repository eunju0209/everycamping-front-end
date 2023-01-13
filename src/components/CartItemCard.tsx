import { useEffect, useState } from 'react';

type CartItemCardProps = {
  key: number;
  title: string;
  count: number;
  price: number;
};

const CartItemCard = ({ key, title, count, price }: CartItemCardProps) => {
  const [itemCounts, setItemCounts] = useState(0);
  useEffect(() => {
    setItemCounts(count);
  }, []);
  const handleCount = {
    minus: () => {
      if (itemCounts <= 1) return;
      setItemCounts((prev) => (prev -= 1));
      // patch api ?? or reactQuery ??
    },
    plus: () => {
      setItemCounts((prev) => (prev += 1));
    },
  };

  const deleteBtn = () => {
    key;
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
            <span className='inline-block px-3'>{itemCounts}</span>
            <button
              className='btn btn-sm rounded-l-none'
              onClick={handleCount.plus}
            >
              +
            </button>
          </div>
        </div>
        <div className='flex flex-col justify-between relative'>
          <button
            className='btn btn-xs px-0 w-6 relative left-full bottom-5'
            onClick={deleteBtn}
          >
            x
          </button>
          <p>가격 : {(price * itemCounts).toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
