import { useLocation } from 'react-router-dom';
import JoinEmailComp from '../components/Join/JoinEmailComp';

const Join = () => {
  return (
    <div className='flex flex-col justify-center mx-auto w-60'>
      <p className='flex justify-center text-4xl'>회원가입</p>
      <JoinEmailComp />
    </div>
  );
};

export default Join;
