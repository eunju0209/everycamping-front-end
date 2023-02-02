import { Link } from 'react-router-dom';
import { TbTent } from 'react-icons/tb';
import Navigation from './Navigation';
import HeaderButtons from './HeaderButtons';
import HeaderSearch from './HeaderSearch';

export default function Header() {
  return (
    <header className='w-full bg-white'>
      <div className='flex items-center justify-between py-1 md:py-4 px-1 md:px-5 md:border-b border-base-100'>
        <Link
          to='/'
          className='flex items-center text-xl md:text-2xl text-primary font-semibold'
        >
          <TbTent className='text-2xl md:text-3xl mr-0.5' />
          <h1>EveryCamping</h1>
        </Link>
        <div className='hidden md:block w-2/6'>
          <HeaderSearch />
        </div>
        <HeaderButtons />
      </div>
      <div className='md:hidden'>
        <HeaderSearch />
      </div>
      <Navigation />
    </header>
  );
}
