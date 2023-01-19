import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUserSocialLogin, useGetUserInfo } from '../../../api/userService';
import { useUserInfo } from '../../../store/UserInfoProvider';

const KaKaoLoginCallback = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useUserInfo();
  let kakaoRequest: { kakao_account: { email: string } };
  useEffect(() => {
    (async () => {
      try {
        const code = new URL(document.location.toString()).searchParams.get(
          'code'
        );
        const client_id = import.meta.env.VITE_KAKAO_LOGIN_RESTAPI_KEY;

        const token = await axios.post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=http://localhost:5173/kakaoLoginCallback&code=${code}`,
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

        await postUserSocialLogin(kakaoRequest.kakao_account.email);

        // useGetUserInfo(storedToken.Token, {
        //   onSuccess: (data) => {
        //     console.log(data);
        //     // setUserInfo({
        //     //   ...data,
        //     //   type: 'user',
        //     //   isLogin: true,
        //     // });
        //     navigate('/');
        //   },
        //   onError: (err) => {
        //     alert('로그인에 실패 했습니다.');
        //   },
        // });
      } catch (err) {
        console.log(err);
        navigate('/join', {
          state: {
            email: kakaoRequest.kakao_account.email,
            type: 'social',
          },
        });
      }
    })();
  }, []);
  return <div>...loading</div>;
};

export default KaKaoLoginCallback;
