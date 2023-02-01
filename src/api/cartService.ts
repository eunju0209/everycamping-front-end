import { authAxios } from './authAxios';
import { PROXY } from './productsService';

export const getCartItems = async () => {
  const result = await authAxios.get(`${PROXY}/carts`);
  return result.data.content;
};

export const patchCartItems = async ({
  id,
  updateQuantity,
}: {
  id: number;
  updateQuantity: number;
}) => {
  try {
    await authAxios.patch(`${PROXY}/carts/${id}`, { updateQuantity });
  } catch (error) {
    console.error(error);
  }
};
export const deleteCartItems = async (id: number) => {
  try {
    await authAxios.delete(`${PROXY}/carts/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const addCart = async (productId: string, quantity: number) => {
  return authAxios.post(`${PROXY}/carts/add/${productId}`, { quantity });
};
