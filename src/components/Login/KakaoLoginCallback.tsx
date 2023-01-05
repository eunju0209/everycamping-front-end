import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KaKaoLoginCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const code = new URL(document.location.toString()).searchParams.get(
          "code"
        );
        const client_id = import.meta.env.VITE_KAKAO_LOGIN_RESTAPI_KEY;

        const result = await axios.post(
          `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=http://localhost:5173/kakaoLoginCallback&code=${code}`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        window.Kakao.Auth.setAccessToken(result.data.access_token);
        const userInfo = await window.Kakao.API.request({
          url: "/v2/user/me",
        });

        console.log(userInfo);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return <div></div>;
};

export default KaKaoLoginCallback;
