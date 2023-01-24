const KakaoLogin = () => {
  const REDIRECT_URI = 'http://localhost:5173/kakaoLoginCallback';

  const onClick = async () => {
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
      prompts: 'login',
    });

    // window.location.href = '/api/customers/signin/social/kakao';
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
