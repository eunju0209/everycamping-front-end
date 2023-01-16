import PasswordEditComp from '../../components/UserInfo/PasswordEditComp';

const PasswordEdit = () => {
  return (
    <div className='flex flex-col justify-center mx-auto w-80'>
      <p className='flex justify-center text-4xl'>비밀번호 수정</p>
      <PasswordEditComp />
    </div>
  );
};

export default PasswordEdit;
