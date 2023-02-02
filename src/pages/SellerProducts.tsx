import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ProductList from '../components/Product/ProductList';
import { useUserInfo } from '../store/UserInfoProvider';

export default function SellerProducts() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  }, []);

  return (
    <>
      <ProductList seller={true} />
    </>
  );
}
