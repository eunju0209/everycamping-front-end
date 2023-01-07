import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal/Modal';

type JoinInfoType = {
  email: string;
  nickName: string;
  password: string;
  phoneNumber: string;
};

export default function Join() {
  const [joinInfo, setJoinInfo] = useState<JoinInfoType>({
    email: '',
    nickName: '',
    password: '',
    phoneNumber: '',
  });
  const [isSeller, setIsSeller] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [code, setCode] = useState('');
  const [toggleModal, setToggleModal] = useState(false);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    } else if (name === 'code') {
      setCode(value);
    } else if (name === 'seller') {
      setIsSeller((prev) => !prev);
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
      if (isSeller) {
        // 판매자 회원가입 api 전송
      } else {
        // 구매자 회원가입 api 전송
      }

      console.log(joinInfo);

      navigate('/');
    } catch (error) {}
  };

  const checked = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement;
    //email, nickName 서버 전송 / 중복 확인

    if (name === 'email') {
      setToggleModal(true);
      //email 인증 코드 전송.
      joinInfo.email;
      (divRef.current as HTMLDivElement).style.display = 'flex';
    } else if (name === 'code') {
      // 코드 일치 확인
      (codeInputRef.current as HTMLInputElement).disabled = true;
      (emailInputRef.current as HTMLInputElement).disabled = true;
    } else if (name === 'nickName') {
      joinInfo.nickName;
    }
  };

  return (
    <div className='flex flex-col justify-center mx-auto w-60'>
      <p className='flex justify-center text-4xl'>회원가입</p>
      <form className='flex flex-col mt-10' onSubmit={(e) => onSubmit(e)}>
        <div className='flex relative w-full'>
          <input
            className='p-2 input w-full max-w-xs bg-white'
            name='email'
            type='email'
            placeholder='Email'
            required
            autoComplete='off'
            value={joinInfo.email}
            onChange={(e) => onChange(e)}
            ref={emailInputRef}
          />
          <button
            className='absolute left-full w-24 ml-2 p-2 btn btn-primary'
            name='email'
            type='button'
            onClick={(e) => checked(e)}
          >
            인증하기
          </button>
        </div>
        <div className='flex relative mt-2 w-full hidden' ref={divRef}>
          <input
            className='p-2 input w-full max-w-xs bg-white'
            name='code'
            type='text'
            placeholder='인증코드'
            required
            autoComplete='off'
            value={code}
            onChange={(e) => onChange(e)}
            ref={codeInputRef}
          />
          <button
            className='absolute left-full w-24 ml-2 p-2 btn btn-primary'
            name='code'
            type='button'
            onClick={(e) => checked(e)}
          >
            인증완료
          </button>
        </div>
        <div className='flex relative mt-2 w-full'>
          <input
            className='p-2 input w-full max-w-xs bg-white'
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
            className='mt-2 p-2 input w-full max-w-xs bg-white '
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
            className='mt-2 p-2 input w-full max-w-xs bg-white '
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
          className='mt-2 p-2 input w-full max-w-xs bg-white '
          name='phoneNumber'
          type='tel'
          placeholder='010-0000-0000'
          required
          autoComplete='off'
          value={joinInfo.phoneNumber}
          onChange={(e) => onChange(e)}
          pattern='[0,1]{3}-[0-9]{4}-[0-9]{4}'
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
            <span>판매자로 가입</span>
          </label>
          <div>
            <p className='absolute mt-0.5 text-sm text-red-500'>
              * 판매자 가입은 승인까지 2~3일 정도 소요 됩니다.
            </p>
          </div>
        </div>
        <input
          className='mt-10 p-1.5 cursor-pointer btn btn-primary'
          type='submit'
          value='Join'
        />
      </form>
      <Modal toggleModal={toggleModal} setToggleModal={setToggleModal}>
        이메일로 코드가 전송 되었습니다.
      </Modal>
    </div>
  );
}
