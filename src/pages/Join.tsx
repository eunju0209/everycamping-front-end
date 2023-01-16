import { useLocation } from 'react-router-dom';
import JoinEmailComp from '../components/Join/JoinEmailComp';
import JoinSocialComp from '../components/Join/JoinSocialComp';

const Join = () => {
  const { state } = useLocation();
  return (
    <div className='flex flex-col justify-center mx-auto w-60'>
      <p className='flex justify-center text-4xl'>회원가입</p>
      {state.type === 'email' ? <JoinEmailComp /> : <JoinSocialComp />}
    </div>
  );
};

export default Join;
