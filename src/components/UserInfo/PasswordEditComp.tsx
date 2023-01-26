import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patchSellerPassword, patchUserPassword } from '../../api/userService';
import { useUserInfo } from '../../store/UserInfoProvider';
import { toastSuccess } from '../../util/reactToast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordEditComp = () => {
  const [newPasswordEdit, setNewPasswordEdit] = useState('');
  const [newPasswordEditConfirm, setNewPasswordEditConfirm] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const { userInfo, setUserInfo } = useUserInfo();
  const navgate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'passwordConfirm') {
      setNewPasswordEditConfirm(value);
    } else if (name === 'password') {
      setNewPasswordEdit(value);
    } else if (name === 'oldPassword') {
      setOldPassword(value);
    }
  };

  const eidited = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (userInfo.type === 'user') {
        await patchUserPassword(newPasswordEdit, oldPassword).then(() => {
          toastSuccess('비밀번호 변경 완료');
          navgate('/userinfo');
        });
      } else if (userInfo.type === 'seller') {
        await patchSellerPassword(newPasswordEdit, oldPassword).then(() => {
          toastSuccess('비밀번호 변경 완료');
          navgate('/userinfo');
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className='flex relative mt-10 w-full'>
        <input
          className='mt-2 p-2 input w-full max-w-xs bg-white focus:outline-none'
          name='oldPassword'
          type='password'
          placeholder='Old Password'
          required
          value={oldPassword}
          onChange={(e) => onChange(e)}
        />
        {oldPassword && oldPassword.length < 6 ? (
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
          name='password'
          type='password'
          placeholder='New Password'
          required
          value={newPasswordEdit}
          onChange={(e) => onChange(e)}
        />
        {newPasswordEdit && newPasswordEdit.length < 6 ? (
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
          placeholder='New Password Confirm'
          required
          value={newPasswordEditConfirm}
          onChange={(e) => onChange(e)}
        />
        {newPasswordEditConfirm &&
        newPasswordEditConfirm !== newPasswordEdit ? (
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
      <ToastContainer />
    </div>
  );
};

export default PasswordEditComp;
