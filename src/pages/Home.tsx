import ProductList from '../components/ProductList';
import Slider from '../components/Slider';

export default function Home() {
  return (
    <>
      <Slider />
      <div className='pt-[700px]'>
        <h1 className='text-3xl font-semibold mb-4 mt-10 text-center'>NEW</h1>
        <ProductList category='all' filter='new' />
        <h1 className='text-3xl font-semibold mb-4 mt-14 text-center'>BEST</h1>
        <ProductList category='all' filter='best' />
      </div>
    </>
  );
}
