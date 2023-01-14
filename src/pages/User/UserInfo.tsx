import { useEffect, useState } from 'react';
import UserInfoComp from '../../components/User/UserInfoComp';
import UserInfoEditComp from '../../components/User/UserInfoEditComp';
import { useUserInfo } from '../../context/UserInfoProvider';

const UserInfo = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { userInfo, setUserInfo } = useUserInfo();
  const [newUserInfo, setNewUserInfo] = useState({
    email: '',
    nickName: '',
    phoneNumber: '',
  });

  useEffect(() => {
    setNewUserInfo(userInfo);
  }, []);

  const eidited = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsEdit((prev) => !prev);
    //newUserInfo api 전송
    setUserInfo((prev) => ({ ...prev, ...newUserInfo }));
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
        <UserInfoComp userInfo={userInfo} />
      )}

      <div className='flex justify-center mt-10'>
        <button
          className='w-24 p-2 btn btn-primary'
          type='button'
          onClick={(e) => eidited(e)}
        >
          {isEdit ? '수정완료' : '수정하기'}
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
