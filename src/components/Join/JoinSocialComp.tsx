import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type JoinSocialCompType = {
  email: string;
  nickName: string;
  password: string;
  phoneNumber: string;
};

const JoinSocialComp = () => {
  const location = useLocation();
  const { email } = location.state;
  const [joinInfo, setJoinInfo] = useState<JoinSocialCompType>({
    email: '',
    nickName: '',
    password: '',
    phoneNumber: '',
  });

  useEffect(() => {
    setJoinInfo({
      email: email,
      nickName: '',
      password: '',
      phoneNumber: '',
    });
  }, []);

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    } else {
      setJoinInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (joinInfo.password.length < 6 || joinInfo.password !== passwordConfirm)
      return;

    try {
      // 구매자 회원가입 api 전송

      console.log(joinInfo);

      navigate('/login');
    } catch (error) {}
  };

  const checked = (event: React.MouseEvent<HTMLButtonElement>) => {
    //닉네임 중복체크
    joinInfo.nickName;
  };
  return (
    <div>
      <form className='flex flex-col mt-10' onSubmit={(e) => onSubmit(e)}>
        <div className='flex relative w-full'>
          <input
            className='p-2 input w-full max-w-xs bg-white focus:outline-none'
            name='email'
            type='email'
            placeholder='Email'
            required
            autoComplete='off'
            value={joinInfo.email}
            onChange={(e) => onChange(e)}
            disabled
          />
          <button
            className='absolute left-full w-24 ml-2 p-2 btn btn-primary'
            name='email'
            type='button'
            disabled
          >
            인증하기
          </button>
        </div>
        <div className='flex relative mt-2 w-full'>
          <input
            className='p-2 input w-full max-w-xs bg-white focus:outline-none'
            name='nickName'
            type='text'
            placeholder='Nick Name'
            required
            autoComplete='off'
            value={joinInfo.nickName}
            onChange={(e) => onChange(e)}
          />
          <button
            className='absolute left-full w-24 ml-2 p-2 btn btn-primary'
            name='nickName'
            type='button'
            onClick={(e) => checked(e)}
          >
            중복확인
          </button>
        </div>
        <div className='flex relative w-full'>
          <input
            className='mt-2 p-2 input w-full max-w-xs bg-white focus:outline-none'
            name='password'
            type='password'
            placeholder='Password'
            required
            value={joinInfo.password}
            onChange={(e) => onChange(e)}
          />
          {joinInfo.password && joinInfo.password.length < 6 ? (
            <span className='absolute left-full bottom-2 ml-2 whitespace-nowrap text-sm text-red-500'>
              비밀번호는 최소 6글자 이상 이어야 합니다.
            </span>
          ) : (
            ''
          )}
        </div>
        <div className='flex relative w-full'>
          <input
            className='mt-2 p-2 input w-full max-w-xs bg-white focus:outline-none'
            name='passwordConfirm'
            type='password'
            placeholder='Password Confirm'
            required
            value={passwordConfirm}
            onChange={(e) => onChange(e)}
          />
          {passwordConfirm && passwordConfirm !== joinInfo.password ? (
            <span className='absolute left-full bottom-2 ml-2 whitespace-nowrap text-sm text-red-500'>
              비밀번호가 일치하지 않습니다.
            </span>
          ) : (
            ''
          )}
        </div>
        <input
          className='mt-2 p-2 input w-full max-w-xs bg-white focus:outline-none'
          name='phoneNumber'
          type='tel'
          placeholder='010-0000-0000'
          required
          autoComplete='off'
          value={joinInfo.phoneNumber}
          onChange={(e) => onChange(e)}
          pattern='[0,1]{3}-[0-9]{4}-[0-9]{4}'
        />

        <input
          className='mt-10 p-1.5 cursor-pointer btn btn-primary'
          type='submit'
          value='Join'
        />
      </form>
    </div>
  );
};

export default JoinSocialComp;
