const KakaoLogin = () => {
  const onClick = () => {
    window.Kakao.Auth.authorize({
      redirectUri: 'http://localhost:5173/kakaoLoginCallback',
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
