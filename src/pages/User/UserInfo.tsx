import { useEffect, useState } from 'react';
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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    setNewUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checked = (event: React.MouseEvent<HTMLButtonElement>) => {
    //닉네임 중복체크
  };

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
      <div className='flex flex-col mt-10'>
        <div className='form-control'>
          <label className='input-group'>
            <span className='whitespace-nowrap'>이메일</span>
            <div className='input input-bordered w-full flex justify-center items-center'>
              <p className='text-lg'>{userInfo.email}</p>
            </div>
          </label>
        </div>
        <div className='relative form-control mt-3'>
          <label className='input-group'>
            <span className='whitespace-nowrap'>닉네임</span>
            {isEdit ? (
              <>
                <input
                  className='input input-bordered w-full text-lg bg-white focus:outline-none'
                  type='text'
                  name='nickName'
                  placeholder={userInfo.nickName}
                  onChange={(e) => onChange(e)}
                  value={newUserInfo.nickName}
                  required
                  autoComplete='off'
                />
              </>
            ) : (
              <div className='input input-bordered w-full flex justify-center items-center'>
                <p className='text-lg'>{userInfo.nickName}</p>
              </div>
            )}
          </label>
          {isEdit ? (
            <button
              className='absolute left-full w-24 ml-2 btn btn-primary'
              name='nickName'
              type='button'
              onClick={(e) => checked(e)}
            >
              중복확인
            </button>
          ) : (
            ''
          )}
        </div>
        <div className='form-control mt-3'>
          <label className='input-group'>
            <span className='whitespace-nowrap'>연락처</span>
            {isEdit ? (
              <input
                className='input input-bordered w-full text-lg bg-white focus:outline-none'
                name='phoneNumber'
                type='tel'
                placeholder={userInfo.phoneNumber}
                value={newUserInfo.phoneNumber}
                required
                autoComplete='off'
                onChange={(e) => onChange(e)}
                pattern='[0,1]{3}-[0-9]{4}-[0-9]{4}'
              />
            ) : (
              <div className='input input-bordered w-full flex justify-center items-center'>
                <p className='text-lg'>{userInfo.phoneNumber}</p>
              </div>
            )}
          </label>
        </div>
      </div>
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
