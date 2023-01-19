import { useQuery } from '@tanstack/react-query';
import { authAxios } from './authAxios';

const getCartItems = async () => {
  try {

    const result = await authAxios.get(`/api/carts`)


    return result.data.content;
  } catch (error) {
    console.error(error);
  }
};
export const useGetCartItems = () => {
  return useQuery(['@CartItem'], getCartItems);
};

export const patchCartItems = async ({
  id,
  itemCounts,
}: {
  id: number;
  itemCounts: number;
}) => {
  try {
    const result = await authAxios.patch(`/api/carts/${id}`, { itemCounts });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const deleteCartItems = async (id: number) => {
  try {
    const result = await authAxios.delete(`/api/carts/${id}`);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const addCart = async (productId: string, quantity: number) => {
  return authAxios.post(`/api/carts/add/${productId}`, { quantity });
};
