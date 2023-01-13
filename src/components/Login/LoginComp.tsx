import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, sellerLogin, userLogin } from '../../api/userService';
import { useUserInfo } from '../../context/UserInfoProvider';
import KakaoLogin from './socialLogin/KakaoLogin';

export type loginInfoType = {
  email: string;
  password: string;
};

const LoginComp = () => {
  const [loginInfo, setLoginInfo] = useState<loginInfoType>({
    email: '',
    password: '',
  });
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserInfo();

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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      //  login 정보 받아서 서버에 전송
      if (isSeller) {
        // 판매자 로그인 api 전송 // accesstoken 받기
        // const userToken = await sellerLogin(loginInfo);
        // const result = await getUserInfo(userToken);
        // setUserInfo({type: seller});
      } else {
        // 구매자 로그인 api 전송 // accesstoken 받기
        // const userToken = await userLogin(loginInfo);
        // const result = await getUserInfo(userToken);
        // setUserInfo({type: user})
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
    <>
      <form className='flex flex-col mt-10' onSubmit={(e) => onSubmit(e)}>
        <input
          className='p-2 input w-full max-w-xs bg-white focus:outline-none'
          name='email'
          type='email'
          placeholder='Email'
          required
          autoComplete='off'
          value={loginInfo.email}
          onChange={(e) => onChange(e)}
        />
        <input
          className='mt-2 p-2 input w-full max-w-xs bg-white focus:outline-none'
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
    </>
  );
};

export default LoginComp;
