import { Link } from 'react-router-dom';

export default function AdminLink() {
  return (
    <>
      <li>
        <Link to='/sellerConfirm'>판매자승인</Link>
        <Link to='/mypage/admin/chatList'>1:1 문의</Link>
      </li>
    </>
  );
}
