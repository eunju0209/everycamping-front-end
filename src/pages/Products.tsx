import ProductInfiniteList from '../components/Product/ProductInfiniteList';
import ProductList from '../components/Product/ProductList';

type ProductsProps = {
  category?: 'ALL' | 'TENT' | 'COOK' | 'ACCESSORY';
};

export default function Products({ category }: ProductsProps) {
  return (
    <>
      {category && (
        <h1 className='text-4xl mb-8 text-center uppercase'>{category}</h1>
      )}
      <ProductInfiniteList category={category} filter='createdAt' />
    </>
  );
}
