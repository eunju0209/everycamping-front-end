import { Link } from 'react-router-dom';

export default function SellerLink() {
  return (
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
      <li>
        <Link to='/mypage/seller/calculation'>정산</Link>
      </li>
      <li>
        <Link to='/mypage/chatList'>1:1 문의</Link>
      </li>
    </>
  );
}
