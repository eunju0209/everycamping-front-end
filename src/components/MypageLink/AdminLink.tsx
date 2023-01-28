import { Link } from 'react-router-dom';

export default function AdminLink() {
  return (
    <>
      <li>
        <Link to='/sellerConfirm'>판매자승인</Link>
      </li>
      <li>
        <Link to='/mypage/chatList'>1:1 문의</Link>
      </li>
    </>
  );
}
