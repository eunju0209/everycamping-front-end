import Chatting from '../components/Chat';
import ProductList from '../components/Product/ProductList';
import Slider from '../components/Slider';

export default function Home() {
  return (
    <>
      <Slider />
      <div className='pt-[700px]'>
        <h1 className='text-3xl font-semibold mb-4 mt-10 text-center'>NEW</h1>
        <ProductList filter='recency' />
        <h1 className='text-3xl font-semibold mb-4 mt-14 text-center'>BEST</h1>
        <ProductList filter='popul' />
        <Chatting />
      </div>
    </>
  );
}
