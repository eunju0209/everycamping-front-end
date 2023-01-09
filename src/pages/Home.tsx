import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <>
      <h1 className='text-3xl font-semibold mb-4 text-center'>NEW</h1>
      <ProductList category='all' filter='new' />
      <h1 className='text-3xl font-semibold mb-4 mt-12 text-center'>BEST</h1>
      <ProductList category='all' filter='best' />
    </>
  );
}
