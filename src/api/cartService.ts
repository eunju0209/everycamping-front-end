import { authAxios } from './authAxios';

export const getCartItems = async () => {
    const result = await authAxios.get(`/api/carts`)
    // const result = await authAxios.get(`/assets/data/cart/cartItems.json`)
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
    await authAxios.patch(`/api/carts/${id}`, { updateQuantity });
  } catch (error) {
    console.error(error);
  }
};
export const deleteCartItems = async (id: number) => {
  try {
    await authAxios.delete(`/api/carts/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const addCart = async (productId: string, quantity: number) => {
  return authAxios.post(`/api/carts/add/${productId}`, { quantity });
};
