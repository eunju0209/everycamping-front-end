type UserInfoCompProps = {
  userInfo: {
    email: string;
    nickName: string;
    phoneNumber: string;
  };
};

const UserInfoComp = ({ userInfo }: UserInfoCompProps) => {
  return (
    <div>
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
            <div className='input input-bordered w-full flex justify-center items-center'>
              <p className='text-lg'>{userInfo.nickName}</p>
            </div>
          </label>
        </div>
        <div className='form-control mt-3'>
          <label className='input-group'>
            <span className='whitespace-nowrap'>연락처</span>

            <div className='input input-bordered w-full flex justify-center items-center'>
              <p className='text-lg'>{userInfo.phoneNumber}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default UserInfoComp;
