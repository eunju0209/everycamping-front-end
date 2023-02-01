import { useQuery } from '@tanstack/react-query';
import { getAdminSellerList } from '../api/adminService';
import { getCartItems } from '../api/cartService';
import { getChatList } from '../api/chat';

export const queryGetCartItems = () => {
  const result = useQuery(['@CartItem'], () => getCartItems(), {
    staleTime: 5000,
    retry: 1
  });
  return result
};

export const queryGetAdminSellerList = () => {
  const result = useQuery(['@AdminSellerList'], () => getAdminSellerList(), {
    staleTime: Infinity,
    retry: 1
  });
  return result.data
}

export const queryGetChatList = (userEmail : string, userType : 'CUSTOMER' | 'SELLER' | 'ADMIN') => {
  const result = useQuery(['@ChatList'], () => getChatList(userEmail, userType))
  return result
}