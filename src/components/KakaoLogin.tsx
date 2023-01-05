const KakaoLogin = () => {
  const onClick = () => {
    window.Kakao.Auth.authorize({
      redirectUri: "http://localhost:5173/",
    });
  };

  return (
    <>
      <button
        className="flex justify-center mt-4 p-1.5 bg-yellow-300"
        onClick={onClick}
      >
        Kakao Login
      </button>
    </>
  );
};

export default KakaoLogin;
