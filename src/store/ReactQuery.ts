import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { getCartItems } from '../api/cartService';
import { getSellerInfo, getUserInfo } from '../api/userService';

export const queryGetCartItems = () => {
  const result = useQuery(['@CartItem'], () => getCartItems(), {
    staleTime: 5000,
    retry: 1
  });
  return result
};

// export const useGetUserInfo = (options: (Omit<UseQueryOptions<AxiosResponse<any, any> | undefined, unknown, AxiosResponse<any, any> | undefined, string[]>, "initialData" | "queryFn" | "queryKey"> & { initialData?: (() => undefined) | undefined; }) | undefined) => {
//  useQuery(['@userInfo'], () => getUserInfo(),options);
// };

export const useGetSellerInfo = (options: (Omit<UseQueryOptions<AxiosResponse<any, any> | undefined, unknown, AxiosResponse<any, any> | undefined, string[]>, "initialData" | "queryFn" | "queryKey"> & { initialData?: (() => undefined) | undefined; }) | undefined) => {
  const result = useQuery(['@sellerInfo'], () => getSellerInfo(), options);
  return result.data
}
