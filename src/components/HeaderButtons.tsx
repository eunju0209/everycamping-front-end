import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function HeaderButtons() {
  const navigate = useNavigate();

  return (
    <div className='flex items-center'>
      <div className='group dropdown dropdown-end relative'>
        <label tabIndex={0} className='btn btn-primary m-1 mr-3'>
          <FaUser />
        </label>
        <ul
          tabIndex={0}
          className='absolute right-0 menu p-2 shadow bg-base-100 rounded-box w-52 z-10 invisible group-hover:visible'
        >
          <li>
            <Link to='/mypage/seller/orders'>주문내역</Link>
          </li>
          <li>
            <Link to='/products/new'>제품등록</Link>
          </li>
          <li>
            <Link to='/mypage/products'>등록제품목록</Link>
          </li>
          <li>
            <Link to='/userInfo'>회원정보</Link>
          </li>
        </ul>
      </div>
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
  );
}