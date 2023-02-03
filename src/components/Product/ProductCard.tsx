import { useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { ProductType } from './ProductList';

type ProductCardProps = {
  product: ProductType;
  seller?: boolean;
};

export default function ProductCard({ product, seller }: ProductCardProps) {
  const navigate = useNavigate();
  const { id, name, price, imageUri } = product;
  const { deleteProductMutation } = useProducts();

  return (
    <li className='card bg-base-100 min-h-350px shadow-xl'>
      <figure
        onClick={() => navigate(`/products/detail/${id}`, { state: { id } })}
        className='hover:cursor-pointer hover:brightness-110 transition-all bg-white'
      >
        <img className='object-contain w-full h-56' src={imageUri} alt={name} />
      </figure>
      <div className='card-body'>
        <h2 className='text-xl font-semibold truncate'>{name}</h2>
        <p>{price.toLocaleString()}원</p>
        {seller && (
          <div>
            <button
              className='btn btn-sm mr-2'
              onClick={() => deleteProductMutation.mutate({ id })}
            >
              삭제하기
            </button>
            <button
              className='btn btn-sm'
              onClick={() => navigate(`/products/update/${id}`)}
            >
              수정하기
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
