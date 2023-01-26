import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h1 className='text-5xl font-bold'>404 NOT FOUND</h1>
          <p className='py-6'>요청하신 페이지를 찾을 수 없습니다.</p>
          <button className='btn btn-error' onClick={() => navigate('/')}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
}
