import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "../components/Login/KakaoLogin";

type stateType = {
  email: string;
  password: string;
};

export default function Login() {
  const [state, setState] = useState<stateType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setState({
        ...state,
        email: value,
      });
    } else if (name === "password") {
      setState({
        ...state,
        password: value,
      });
    }
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(event);
      navigate("/");
      setState({
        email: "",
        password: "",
      });
    } catch (error) {}
  };

  return (
    <div className="flex flex-col justify-center mx-auto w-60">
      <p className="flex justify-center text-4xl">로그인</p>
      <form className="flex flex-col mt-10" onSubmit={(e) => onSubmit(e)}>
        <input
          className="p-2"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={state.email}
          onChange={(e) => onChange(e)}
        />
        <input
          className="mt-2 p-2"
          name="password"
          type="password"
          placeholder="Password"
          required
          value={state.password}
          onChange={(e) => onChange(e)}
        />
        <input
          className="mt-5 p-1.5 cursor-pointer btn btn-primary"
          type="submit"
          value="Login"
        />
      </form>
      <KakaoLogin />
      <div className="w-10/12 mx-auto mt-6 border border-gray-300"></div>
      <button
        className="mt-6 p-1.5 btn btn-primary"
        onClick={() => navigate(`/join`)}
      >
        Join
      </button>
    </div>
  );
}
