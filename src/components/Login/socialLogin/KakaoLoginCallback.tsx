import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, postUserSocialLogin } from '../../../api/userService';
import { useUserInfo } from '../../../store/UserInfoProvider';

const KaKaoLoginCallback = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfo();
  let kakaoRequest: {
    kakao_account: {
      email: string;
      profile: {
        nickname: string;
      };
    };
  };

  useEffect(() => {
    (async () => {
      try {
        const AUTHORIZE_CODE = new URL(
          document.location.toString()
        ).searchParams.get('code');
        const REST_API_KEY = import.meta.env.VITE_KAKAO_LOGIN_RESTAPI_KEY;
        const REDIRECT_URI = 'http://localhost:5173/kakaoLoginCallback';

        const token = await axios.post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${AUTHORIZE_CODE}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );
        window.Kakao.Auth.setAccessToken(token.data.access_token);
        kakaoRequest = await window.Kakao.API.request({
          url: '/v2/user/me',
        });

        await postUserSocialLogin(
          kakaoRequest.kakao_account.email,
          kakaoRequest.kakao_account.profile.nickname
        ).then(async () => {
          const data = await getUserInfo();

          setUserInfo({
            email: data.email,
            nickName: data.nickName,
            phoneNumber: data.phoneNumber,
            customerId: data.id,
            type: 'user',
          });

          navigate('/');
        });
      } catch (err) {
        console.log(err);
        alert('로그인을 실패 했습니다.');
      }
    })();
  }, []);
  return <div>...loading</div>;
};

export default KaKaoLoginCallback;
