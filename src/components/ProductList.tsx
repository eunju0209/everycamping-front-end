import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productsService';
import ProductCard from '../components/ProductCard';

export type ProductType = {
  id: string;
  category: string;
  name: string;
  price: number;
  imagePath: string;
};

type ProductsProps = {
  category?: 'all' | 'tent' | 'cook' | 'accessory';
};

export default function ProductList({ category }: ProductsProps) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<ProductType[]>(['products', category], () =>
    getProducts(category)
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something is wrong...</p>;

  return (
    <ul className='grid grid-cols-4 gap-6'>
      {products &&
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </ul>
  );
}
