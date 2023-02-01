import { Link, useNavigate, useParams } from 'react-router-dom';
import { TbTent } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';
import { FormEvent, useEffect, useState } from 'react';
import Navigation from './Navigation';
import HeaderButtons from './HeaderButtons';

export default function Header() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    navigate(`/products/${text}`);
  };

  useEffect(() => setText(keyword || ''), [keyword]);

  return (
    <header className='w-full bg-white'>
      <div className='flex items-center justify-between py-1 md:py-4 px-2 md:px-5 md:border-b border-base-100'>
        <Link
          to='/'
          className='flex items-center text-2xl text-primary font-semibold'
        >
          <TbTent className='text-3xl mr-0.5' />
          <h1>EveryCamping</h1>
        </Link>
        <form
          className='hidden md:flex items-center w-2/6'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='search'
            className='w-full h-10 px-2 outline-none border rounded-l-lg'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type='submit'
            className='flex items-center justify-center text-xl w-12 h-10 rounded-r-lg bg-base-200 text-primary'
          >
            <BiSearch />
          </button>
        </form>
        <HeaderButtons />
      </div>
      <form
        className='flex md:hidden items-center w-full'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='search'
          className='w-full h-10 px-2 outline-none border'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type='submit'
          className='flex items-center justify-center text-xl w-12 h-10 bg-base-200 text-primary'
        >
          <BiSearch />
        </button>
      </form>
      <Navigation />
    </header>
  );
}
