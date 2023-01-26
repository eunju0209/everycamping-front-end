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
