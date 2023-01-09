import { Link, useNavigate, useParams } from 'react-router-dom';
import { TbTent } from 'react-icons/tb';
import { BiSearch } from 'react-icons/bi';
import { FaShoppingCart } from 'react-icons/fa';
import { FormEvent, useEffect, useState } from 'react';

export default function Header() {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/products/${text}`);
  };

  useEffect(() => setText(keyword || ''), [keyword]);

  return (
    <header className='w-full bg-white'>
      <div className='flex items-center justify-between py-4 px-5 border-b border-base-100'>
        <Link
          to='/'
          className='flex items-center text-2xl text-primary font-semibold'
        >
          <TbTent className='text-3xl mr-0.5' />
          <h1>EveryCamping</h1>
        </Link>
        <form className='flex items-center w-2/6' onSubmit={handleSubmit}>
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
        <div className='flex items-center'>
          <button
            onClick={() => navigate('/cart')}
            className='text-3xl mr-4 text-primary'
          >
            <FaShoppingCart />
          </button>
          <button
            onClick={() => navigate('/login')}
            className='btn btn-primary btn-sm'
          >
            Login
          </button>
        </div>
      </div>
      <nav className='flex items-center justify-center gap-5 py-2 drop-shadow'>
        <Link to='/tent' className='hover:text-primary transition-colors'>
          Tent
        </Link>
        <Link to='/cook' className='hover:text-primary transition-colors'>
          Cook
        </Link>
        <Link to='/accessory' className='hover:text-primary transition-colors'>
          Accessory
        </Link>
      </nav>
    </header>
  );
}
