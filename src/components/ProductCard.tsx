import { useNavigate } from 'react-router-dom';
import { deleteProduct } from '../api/productsService';
import { ProductType } from './ProductList';

type ProductCardProps = {
  product: ProductType;
  seller?: boolean;
};

export default function ProductCard({ product, seller }: ProductCardProps) {
  const navigate = useNavigate();
  const { id, name, price, imageUri } = product;
  return (
    <li className='card bg-base-100 shadow-xl'>
      <figure
        onClick={() => navigate(`/products/detail/${id}`, { state: { id } })}
        className='hover:cursor-pointer hover:brightness-110 transition-all'
      >
        <img className='object-cover w-full h-56' src={imageUri} alt={name} />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{name}</h2>
        <p>{price.toLocaleString()}원</p>
        {seller && (
          <div>
            <button className='btn btn-sm' onClick={() => deleteProduct(id)}>
              삭제하기
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
