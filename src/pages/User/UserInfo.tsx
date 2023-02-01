import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getSellerInfo,
  getUserInfo,
  putSellerInfo,
  putUserInfo,
} from '../../api/userService';
import UserInfoComp from '../../components/UserInfo/UserInfoComp';
import UserInfoEditComp from '../../components/UserInfo/UserInfoEditComp';
import { UserInfoType, useUserInfo } from '../../store/UserInfoProvider';
import { toastSuccess } from '../../util/reactToast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from '../../store/cookie';

const UserInfo = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { userInfo, setUserInfo } = useUserInfo();
  const [newUserInfo, setNewUserInfo] = useState<UserInfoType>({
    email: '',
    nickName: '',
    phoneNumber: '',
    customerId: 0,
    type: 'none',
  });

  useEffect(() => {
    (async () => {
      if (getCookie('LoginType') === 'seller') {
        const data = await getSellerInfo();
        setUserInfo({
          email: data.email,
          nickName: data.nickName,
          phoneNumber: data.phoneNumber,
          customerId: data.id,
          type: 'seller',
        });
        setNewUserInfo({
          email: data.email,
          nickName: data.nickName,
          phoneNumber: data.phoneNumber,
          customerId: data.id,
          type: 'seller',
        });
      } else if (getCookie('LoginType') === 'user') {
        const data = await getUserInfo();
        setUserInfo({
          email: data.email,
          nickName: data.nickName,
          phoneNumber: data.phoneNumber,
          customerId: data.id,
          type: 'user',
        });
        setNewUserInfo({
          email: data.email,
          nickName: data.nickName,
          phoneNumber: data.phoneNumber,
          customerId: data.id,
          type: 'user',
        });
      }
    })();
  }, []);

  const eidited = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsEdit((prev) => !prev);
    if (!isEdit) return;
    try {
      if (userInfo.type === 'user') {
        await putUserInfo(newUserInfo).then(() => {
          toastSuccess('수정 성공');
          setUserInfo(newUserInfo);
        });
      } else if (userInfo.type === 'seller') {
        await putSellerInfo(newUserInfo).then(() => {
          toastSuccess('수정 성공');
          setUserInfo(newUserInfo);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col justify-center mx-auto w-80'>
      <p className='flex justify-center text-4xl'>
        {isEdit ? '회원 정보 수정' : '회원 정보'}
      </p>
      {isEdit ? (
        <UserInfoEditComp
          userInfo={userInfo}
          newUserInfo={newUserInfo}
          setNewUserInfo={setNewUserInfo}
        />
      ) : (
        <UserInfoComp userInfo={newUserInfo} />
      )}
      <div className='flex justify-center'>
        <div className='flex justify-center mt-10'>
          <button
            className='w-24 p-2 btn btn-primary'
            type='button'
            onClick={(e) => eidited(e)}
          >
            {isEdit ? '수정완료' : '수정하기'}
          </button>
        </div>
        <div className='flex justify-center mt-10 ml-3'>
          <button
            className='w-24 p-2 btn btn-primary'
            type='button'
            onClick={(e) => navigate('/PasswordEdit')}
          >
            비밀번호 수정
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserInfo;
