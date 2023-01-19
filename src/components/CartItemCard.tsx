import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { deleteCartItems, patchCartItems } from '../api/cartService';

type CartItemCardProps = {
  id: number;
  img: string;
  title: string;
  count: number;
  price: number;
};

const CartItemCard = ({ id, img, title, count, price }: CartItemCardProps) => {
  const [itemCounts, setItemCounts] = useState(0);
  const queryClient = useQueryClient();
  const { mutate } = useMutation(patchCartItems, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['@CartItem'] });
    },
  });
  const deleteMutate = useMutation(deleteCartItems, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['@CartItem'] });
    },
  });

  useEffect(() => {
    setItemCounts(count);
  }, []);

  const handleCount = {
    minus: () => {
      if (itemCounts <= 1) return;
      setItemCounts((prev) => (prev -= 1));
      mutate({ id, itemCounts });
    },
    plus: () => {
      setItemCounts((prev) => (prev += 1));
      mutate({ id, itemCounts });
    },
  };

  const deleteBtn = () => {
    deleteMutate.mutate(id);
  };

  return (
    <div className='flex rounded bg-white mt-3 p-2'>
      <div className='flex align-center h-40 p-2'>
        <img src={img} className='w-full rounded object-contain' />
      </div>
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
          <p>{(price * itemCounts).toLocaleString()}원</p>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
