import { useNavigate } from 'react-router-dom';
import LoginComp from '../components/Login/LoginComp';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-center mx-auto w-60'>
      <p className='flex justify-center text-4xl'>로그인</p>
      <LoginComp />
      <div className='w-10/12 mx-auto mt-6 border border-gray-300'></div>
      <button
        className='mt-6 p-1.5 btn btn-primary'
        onClick={() =>
          navigate(`/join`, {
            state: {
              type: 'email',
            },
          })
        }
      >
        Join
      </button>
    </div>
  );
}
