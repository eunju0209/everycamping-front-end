import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KakaoLogin from '../components/Login/KakaoLogin';

type stateType = {
  email: string;
  password: string;
};

export default function Login() {
  const [loginInfo, setLoginInfo] = useState<stateType>({
    email: '',
    password: '',
  });
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'seller') {
      setIsSeller((prev) => !prev);
      return;
    }
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // user login 정보 받아서 서버에 전송
      if (isSeller) {
        // 판매자 로그인 api 전송 // accesstoken 받기
      } else {
        // 구매자 로그인 api 전송 // accesstoken 받기
      }

      navigate('/');
      setLoginInfo({
        email: '',
        password: '',
      });
      setIsSeller(false);
    } catch (error) {}
  };

  return (
    <div className='flex flex-col justify-center mx-auto w-60'>
      <p className='flex justify-center text-4xl'>로그인</p>
      <form className='flex flex-col mt-10' onSubmit={(e) => onSubmit(e)}>
        <input
          className='p-2 input w-full max-w-xs bg-white'
          name='email'
          type='email'
          placeholder='Email'
          required
          autoComplete='off'
          value={loginInfo.email}
          onChange={(e) => onChange(e)}
        />
        <input
          className='mt-2 p-2 input w-full max-w-xs bg-white'
          name='password'
          type='password'
          placeholder='Password'
          required
          value={loginInfo.password}
          onChange={(e) => onChange(e)}
        />
        <div className='form-control'>
          <label className='label cursor-pointer justify-start'>
            <input
              type='checkbox'
              className='checkbox mr-1'
              name='seller'
              checked={isSeller}
              onChange={(e) => onChange(e)}
            />
            <span>판매자 로그인</span>
          </label>
        </div>
        <input
          className='mt-5 p-1.5 cursor-pointer btn btn-primary'
          type='submit'
          value='Login'
        />
      </form>
      <KakaoLogin />
      <div className='w-10/12 mx-auto mt-6 border border-gray-300'></div>
      <button
        className='mt-6 p-1.5 btn btn-primary'
        onClick={() => navigate(`/join`)}
      >
        Join
      </button>
    </div>
  );
}
