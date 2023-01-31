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
  tag?: string;
};

export default function ProductList({
  category,
  filter,
  keyword,
  seller,
  tag,
}: ProductsProps) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<ProductType[]>(
    ['products', seller, keyword, category, filter, tag],
    () => getProducts(category, filter, keyword, seller, tag),
    { staleTime: 1000 * 60 }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something is wrong...</p>;

  return (
    <div className='max-w-screen-2xl m-auto px-5'>
      {keyword && products && products.length > 0 && (
        <p className='text-lg text-center mb-8'>
          "<span className='font-bold text-primary'>{keyword}</span>" 검색 결과
        </p>
      )}
      {keyword && products && products.length === 0 && (
        <p className='text-lg text-center mb-8'>
          "<span className='font-bold text-error'>{keyword}</span>"에 대한
          검색결과가 없습니다.
        </p>
      )}
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} seller={seller} />
          ))}
      </ul>
    </div>
  );
}
