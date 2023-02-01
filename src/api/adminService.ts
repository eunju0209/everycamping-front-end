import { authAxios } from './authAxios';
import { PROXY } from './productsService';

export const getAdminSellerList = async () => {

  const result = await authAxios.get(`${PROXY}/admins/seller`);
  return result.data.content;
};
export const putAdminSellerList = async (id: number) => {
  const result = await authAxios.put(
    `${PROXY}/admins/seller`,
    JSON.stringify([id]), {
            headers:
            {
                'Content-Type': 'application/json'
            }
    }
  );
};
