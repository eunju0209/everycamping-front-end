import { useEffect, useState } from 'react';
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {
  getAdminLogOut,
  getSellerLogOut,
  getUserLogOut,
} from '../api/userService';
import { getCookie, removeCookie } from '../store/cookie';
import { useUserInfo } from '../store/UserInfoProvider';

export default function HeaderButtons() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserInfo();
  const [user, setUser] = useState(false);

  useEffect(() => {
    getCookie('LoginType') ? setUser(true) : setUser(false);
  }, [userInfo]);

  const logout = async () => {
    if (getCookie('LoginType') === 'seller') {
      await getSellerLogOut();
    } else if (getCookie('LoginType') === 'user') {
      await getUserLogOut();
    } else if (getCookie('LoginType') === 'admin') {
      await getAdminLogOut();
    }
    removeCookie('LoginType');
    removeCookie('accessToken');
    removeCookie('refreshToken');
    setUserInfo({
      email: '',
      nickName: '',
      phoneNumber: '',
      customerId: 0,
      type: 'none',
    });
    navigate('/');
  };

  return (
    <div className='flex items-center'>
      <div className='group dropdown dropdown-end relative'>
        {user && (
          <label tabIndex={0} className='btn btn-primary rounded-full m-1 mr-3'>
            <FaUser />
          </label>
        )}
        <ul
          tabIndex={0}
          className='absolute right-0 menu p-2 shadow bg-base-100 rounded-box w-52 z-10 invisible group-hover:visible'
        >
          {getCookie('LoginType') === 'user' && (
            <>
              <li>
                <Link to='/mypage/user/orders'>주문내역</Link>
              </li>
              <li>
                <Link to='/mypage/user/reviews'>리뷰목록</Link>
              </li>
              <li>
                <Link to='/userInfo'>회원정보</Link>
              </li>
            </>
          )}
          {getCookie('LoginType') === 'seller' && (
            <>
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
            </>
          )}
          {getCookie('LoginType') === 'admin' && (
            <>
              <li>
                <Link to='/sellerConfirm'>판매자승인</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <button
        onClick={() => navigate('/cart')}
        className='text-3xl mr-4 text-primary'
      >
        <FaShoppingCart />
      </button>
      {getCookie('LoginType') ? (
        <button onClick={logout} className='btn btn-primary btn-sm'>
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className='btn btn-primary btn-sm'
        >
          Login
        </button>
      )}
    </div>
  );
}
