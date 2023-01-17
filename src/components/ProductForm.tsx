import { ChangeEvent, FormEvent, useState } from 'react';
import { addNewProduct } from '../api/productsService';

export type NewProductType = {
  category: string;
  name: string;
  price: string;
  stock: string;
  image: string;
  description: string;
  onsale: boolean;
};

export default function ProductForm() {
  const [product, setProduct] = useState({
    category: 'category',
    name: '',
    price: '',
    stock: '',
    image: '',
    description: '',
    onsale: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((product) => {
      if (name === 'onsale') {
        return { ...product, onsale: !product.onsale };
      }
      return { ...product, [name]: value };
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addNewProduct(product);
  };

  return (
    <form className='flex flex-col gap-3 items-center' onSubmit={handleSubmit}>
      <select
        className='select w-full max-w-xs bg-white'
        name='category'
        onChange={handleChange}
        value={product.category ?? ''}
      >
        <option disabled selected value='category'>
          카테고리
        </option>
        <option value='tent'>Tent</option>
        <option value='cook'>Cook</option>
        <option value='accessory'>Accessory</option>
      </select>
      <input
        type='text'
        name='name'
        value={product.name ?? ''}
        placeholder='제품명'
        className='input w-full max-w-xs bg-white'
        required
        onChange={handleChange}
      />
      <input
        type='number'
        name='price'
        value={product.price ?? ''}
        min='0'
        placeholder='가격'
        className='input w-full max-w-xs bg-white'
        required
        onChange={handleChange}
      />
      <input
        type='number'
        name='stock'
        value={product.stock ?? ''}
        min='0'
        placeholder='수량'
        className='input w-full max-w-xs bg-white'
        required
        onChange={handleChange}
      />
      <input
        type='file'
        name='image'
        className='file-input w-full max-w-xs bg-white'
        accept='image/*'
        required
        onChange={handleChange}
      />
      <textarea
        name='description'
        value={product.description ?? ''}
        className='textarea w-full max-w-xs bg-white text-base'
        placeholder='제품설명'
        required
        onChange={handleChange}
      ></textarea>
      <label className='label cursor-pointer'>
        <span className='label-text mr-2'>판매</span>
        <input
          type='checkbox'
          className='checkbox checkbox-primary'
          name='onsale'
          onChange={handleChange}
          checked={product.onsale}
        />
      </label>
      <button type='submit' className='btn btn-wide btn-primary mt-3'>
        등록하기
      </button>
    </form>
  );
}
