import axios from 'axios';
import { postUserSocialLogin } from '../../../api/userService';

const KakaoLogin = () => {
  const onClick = async () => {
    // window.Kakao.Auth.authorize({
    //   redirectUri: 'http://localhost:5173/kakaoLoginCallback',
    // });
    await postUserSocialLogin();

    // GET /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code HTTP/1.1
    // Host: kauth.kakao.com
    //   const client_id = import.meta.env.VITE_KAKAO_LOGIN_RESTAPI_KEY;
    //   axios.get(
    //     `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri='http://localhost:5173/kakaoLoginCallback'&response_type=code`
    //   );
  };

  return (
    <>
      <button
        className='mt-4 p-1.5 btn text-black bg-yellow-300 border-yellow-300 hover:bg-yellow-400 hover:border-yellow-400'
        onClick={onClick}
      >
        Kakao Login
      </button>
    </>
  );
};

export default KakaoLogin;
