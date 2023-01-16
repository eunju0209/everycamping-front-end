import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KaKaoLoginCallback = () => {
  const navigate = useNavigate();
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
        const userInfo = await window.Kakao.API.request({
          url: '/v2/user/me',
        });

        // 유저 인포 전달.
        //이미 가입 된 회원이면 로그인 navigate('/');

        //아니면 회원가입 페이지로 보냄
        console.log(userInfo.kakao_account.email);

        navigate('/join', {
          state: {
            email: userInfo.kakao_account.email,
            type: 'social',
          },
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return <div></div>;
};

export default KaKaoLoginCallback;
