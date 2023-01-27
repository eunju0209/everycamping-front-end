import { Link } from 'react-router-dom';

export default function UserLink() {
  return (
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
  );
}
