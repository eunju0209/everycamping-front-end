import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, postUserSocialLogin } from '../../../api/userService';
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
          `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:5173/kakaoLoginCallback&code=${code}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
          }
        );
        window.Kakao.Auth.setAccessToken(token.data.access_token);
        kakaoRequest = await window.Kakao.API.request({
          url: '/v2/user/me',
        });

        // await postUserSocialLogin(kakaoRequest.kakao_account.email).then(
        //   async () => {
        //     const data = await getUserInfo();
        //     setUserInfo({
        //       email: data.email,
        //       nickName: data.nickName,
        //       phoneNumber: data.phoneNumber,
        //       type: 'user',
        //     });
        //   }
        // );
      } catch (err) {
        console.log(err);
        // navigate('/join', {
        //   state: {
        //     email: kakaoRequest.kakao_account.email,
        //     type: 'social',
        //   },
        // });
      }
    })();
  }, []);
  return <div>...loading</div>;
};

export default KaKaoLoginCallback;
