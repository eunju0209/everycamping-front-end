const KakaoLogin = () => {
  const REDIRECT_URI = `${
    new URL(document.location.toString()).origin
  }/kakaoLoginCallback`;

  const onClick = () => {
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URI,
      prompts: 'login',
    });
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
