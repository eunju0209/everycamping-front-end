import ProductList from '../components/ProductList';

type ProductsProps = {
  category?: 'ALL' | 'TENT' | 'COOK' | 'ACCESSORY';
};

export default function Products({ category }: ProductsProps) {
  return (
    <>
      {category && (
        <h1 className='text-4xl mb-8 text-center uppercase'>{category}</h1>
      )}
      <ProductList category={category} filter='recency' />
    </>
  );
}
