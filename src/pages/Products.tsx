import { useQuery } from '@tanstack/react-query';
import FakeProductsService from '../api/fakeProductsService';
import ProductCard from '../components/ProductCard';

export type ProductType = {
  id: string;
  category: string;
  name: string;
  price: number;
  imagePath: string;
};

type ProductsProps = {
  category?: 'tent' | 'cook' | 'accessory';
};

const productsService = new FakeProductsService();
export default function Products({ category }: ProductsProps) {
  const {
    isLoading,
    error,
    data: products,
  } = useQuery<ProductType[]>({
    queryKey: ['products', category],
    queryFn: () => productsService.getProducts(category),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something is wrong...</p>;

  return (
    <>
      {category && (
        <h1 className='text-4xl mb-8 text-center uppercase'>{category}</h1>
      )}
      <ul className='grid grid-cols-4 gap-6'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
    </>
  );
}
