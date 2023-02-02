import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

export default function HeaderSearch() {
  const { keyword, category } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState('ALL');
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim().length === 0) {
      return;
    }
    navigate(`/products/${value}/${text}`);
  };

  useEffect(() => setText(keyword || ''), [keyword]);

  useEffect(() => setValue(category || 'ALL'), [category]);

  return (
    <form className='flex items-center w-full' onSubmit={handleSubmit}>
      <select
        className='select select-sm mr-2'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <option value='ALL'>All</option>
        <option value='TENT'>Tent</option>
        <option value='COOK'>Cook</option>
        <option value='ACCESSORY'>Accessory</option>
      </select>
      <input
        type='text'
        placeholder='search'
        className='w-full h-10 px-2 outline-none border md:rounded-l-lg'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type='submit'
        className='flex items-center justify-center text-xl w-12 h-10 md:rounded-r-lg bg-base-200 text-primary'
      >
        <BiSearch />
      </button>
    </form>
  );
}
