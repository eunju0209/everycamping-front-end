import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patchUserPassword } from '../../api/userService';

const PasswordEditComp = () => {
  const [passwordEdit, setPasswordEdit] = useState('');
  const [passwordEditConfirm, setPasswordEditConfirm] = useState('');
  const navgate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'passwordConfirm') {
      setPasswordEditConfirm(value);
    } else if (name === 'password') {
      setPasswordEdit(value);
    }
  };

  const eidited = (event: React.MouseEvent<HTMLButtonElement>) => {
    //password수정 api 전송
    patchUserPassword();
    navgate('/userinfo');
  };

  return (
    <div>
      <div className='flex relative mt-10 w-full'>
        <input
          className='mt-2 p-2 input w-full max-w-xs bg-white focus:outline-none'
          name='password'
          type='password'
          placeholder='Password'
          required
          value={passwordEdit}
          onChange={(e) => onChange(e)}
        />
        {passwordEdit && passwordEdit.length < 6 ? (
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
          value={passwordEditConfirm}
          onChange={(e) => onChange(e)}
        />
        {passwordEditConfirm && passwordEditConfirm !== passwordEdit ? (
          <span className='absolute left-full bottom-2 ml-2 whitespace-nowrap text-sm text-red-500'>
            비밀번호가 일치하지 않습니다.
          </span>
        ) : (
          ''
        )}
      </div>
      <div className='flex justify-center mt-10'>
        <button
          className='w-24 p-2 btn btn-primary'
          type='button'
          onClick={(e) => eidited(e)}
        >
          수정완료
        </button>
      </div>
    </div>
  );
};

export default PasswordEditComp;
