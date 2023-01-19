import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserInfoComp from '../../components/UserInfo/UserInfoComp';
import UserInfoEditComp from '../../components/UserInfo/UserInfoEditComp';
import { useUserInfo } from '../../store/UserInfoProvider';

const UserInfo = () => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const { userInfo, setUserInfo } = useUserInfo();
  const [newUserInfo, setNewUserInfo] = useState({
    email: '',
    nickName: '',
    phoneNumber: '',
  });
  const [isSeller, setIsSeller] = useState(false);

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
          isSeller={isSeller}
        />
      ) : (
        <UserInfoComp userInfo={userInfo} />
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
            onClick={(e) =>
              navigate('/PasswordEdit', {
                state: isSeller,
              })
            }
          >
            비밀번호 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
