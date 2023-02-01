import Chatting from '../components/Chatting/Chatting';
import ProductList from '../components/Product/ProductList';
import Slider from '../components/Slider';
import { getCookie } from '../store/cookie';

export default function Home() {
  return (
    <>
      <Slider />
      <div>
        <h1 className='text-3xl font-semibold mb-4 mt-10 text-center'>NEW</h1>
        <ProductList filter='createdAt' />
        <h1 className='text-3xl font-semibold mb-4 mt-14 text-center'>BEST</h1>
        <ProductList filter='avgScore' />
        {getCookie('LoginType') === 'user' ? <Chatting /> : ''}
      </div>
    </>
  );
}
