import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { getSellerLogOut, getUserLogOut } from '../api/userService';
import { getCookie, removeCookie } from '../store/cookie';

export default function HeaderButtons() {
  const navigate = useNavigate();

  const logout = async () => {
    if (getCookie('LoginType') === 'seller') {
      await getSellerLogOut().then(() => {
        removeCookie('LoginType');
        removeCookie('accessToken');
        removeCookie('refreshToken');
      });
    } else if (getCookie('LoginType') === 'user') {
    }
  };

  return (
    <div className='flex items-center'>
      <div className='group dropdown dropdown-end relative'>
        <label tabIndex={0} className='btn btn-primary rounded-full m-1 mr-3'>
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
          <li>
            <Link to='/mypage/user/reviews'>리뷰목록</Link>
          </li>
        </ul>
      </div>
      <button
        onClick={() => navigate('/cart')}
        className='text-3xl mr-4 text-primary'
      >
        <FaShoppingCart />
      </button>
      {getCookie('LoginType') ? (
        <button
          onClick={() => navigate('/login')}
          className='btn btn-primary btn-sm'
        >
          Login
        </button>
      ) : (
        <button onClick={logout} className='btn btn-primary btn-sm'>
          Logout
        </button>
      )}
    </div>
  );
}
