import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  postSellerLogin,
  postUserLogin,
  useGetSellerInfo,
  useGetUserInfo,
} from '../../api/userService';
import { useUserInfo } from '../../store/UserInfoProvider';
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
  // const { userInfo, setUserInfo } = useUserInfo();

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
      if (isSeller) {
        await postSellerLogin(loginInfo).then(() => navigate('/'));
        // useGetSellerInfo(storedToken.Token, {
        //   onSuccess: (data) => {
        //     console.log(data);
        //     // setUserInfo({
        //     //   ...data,
        //     //   type: 'seller',
        //     //   isLogin: true,
        //     // });
        //   },
        //   onError: () => {
        //     alert('로그인에 실패 했습니다.');
        // },
        // });
        navigate('/');
      } else {
        await postUserLogin(loginInfo).then(() => navigate('/'));
        // useGetUserInfo(storedToken.Token, {
        //   onSuccess: (data) => {
        //     console.log(data);
        //     // setUserInfo({
        //     //   ...data,
        //     //   type: 'user',
        //     //   isLogin: true,
        //     // });
        //   },
        //   onError: (err) => {
        //     alert('로그인에 실패 했습니다.');
        //   },
        // });
      }

      setLoginInfo({
        email: '',
        password: '',
      });
      setIsSeller(false);
    } catch (error: any) {
      console.log(error.response.data.message);
      if (error.response.data.message === '존재하지 않는 회원입니다.') {
        alert('존재하지 않는 회원입니다.');
      }
    }
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
