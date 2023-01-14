type newUserInfo = {
  email: string;
  nickName: string;
  phoneNumber: string;
};

type UserInfoEditCompProps = {
  userInfo: newUserInfo;
  newUserInfo: newUserInfo;
  setNewUserInfo: React.Dispatch<React.SetStateAction<newUserInfo>>;
  isSeller: boolean;
};

const UserInfoEditComp = ({
  userInfo,
  newUserInfo,
  setNewUserInfo,
  isSeller,
}: UserInfoEditCompProps) => {
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
          </label>
          <button
            className='absolute left-full w-24 ml-2 btn btn-primary'
            name='nickName'
            type='button'
            onClick={(e) => checked(e)}
          >
            중복확인
          </button>

          <div className='form-control mt-3'>
            <label className='input-group'>
              <span className='whitespace-nowrap'>연락처</span>
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
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoEditComp;
