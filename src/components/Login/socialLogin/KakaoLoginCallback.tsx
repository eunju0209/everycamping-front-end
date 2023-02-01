import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../../../api/userService';
import { setCookie } from '../../../store/cookie';
import { useUserInfo } from '../../../store/UserInfoProvider';
import EmptyPage from '../../EmptyPage';

const KaKaoLoginCallback = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useUserInfo();

  useEffect(() => {
    (async () => {
      const AUTHORIZE_CODE = new URL(
        document.location.toString()
      ).searchParams.get('code');

      await axios
        .post(
          `api/customers/signin/social/kakao`,
          {
            code: JSON.stringify(AUTHORIZE_CODE),
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then(async (result) => {
          setCookie('accessToken', result.data.accessToken, {
            path: '/',
          });
          setCookie('refreshToken', result.data.refreshToken, {
            path: '/',
          });
          setCookie('LoginType', 'user', {
            path: '/',
          });

          navigate('/');

          const data = await getUserInfo();
          setUserInfo({
            email: data.email,
            nickName: data.nickName,
            phoneNumber: data.phoneNumber,
            customerId: data.id,
            type: 'user',
          });
        });
    })();
  }, []);
  return (
    <div>
      <EmptyPage text='Loading .... ... ' />
    </div>
  );
};

export default KaKaoLoginCallback;
