import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../api/productsService';
import ProductCard from './ProductCard';

export type ProductType = {
  id: string;
  category: string;
  name: string;
  price: number;
  imageUri: string;
};

type ProductsProps = {
  category?: 'ALL' | 'TENT' | 'COOK' | 'ACCESSORY';
  filter?: string;
  keyword?: string;
  seller?: boolean;
};

export default function ProductList({
  category,
  filter,
  keyword,
  seller,
}: ProductsProps) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<ProductType[]>(
    ['products', seller, keyword, category, filter],
    () => getProducts(category, filter, keyword, seller),
    { staleTime: 1000 * 60 }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something is wrong...</p>;

  return (
    <ul className='grid grid-cols-4 gap-6'>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} seller={seller} />
        ))}
    </ul>
  );
}
