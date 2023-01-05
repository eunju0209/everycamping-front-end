import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "../components/KakaoLogin";


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { name, value } } = event;
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value);
    }
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {

      navigate('/')
      setEmail("");
      setPassword("");
    } catch (error) {

    }

  }

return (
  <div className="flex flex-col justify-center mx-auto w-60" >
    <p className="flex justify-center text-4xl" >로그인</p>
    <form className="flex flex-col mt-10" onSubmit={(e) => onSubmit(e)} >
      <input className="p-2" name="email" type="email" placeholder="Email" required value={email} onChange={(e) => onChange(e)} />
      <input className="mt-2 p-2" name="password" type="password" placeholder="Password" required value={password} onChange={(e) => onChange(e)} />
      <input className="mt-5 p-1.5 text-white cursor-pointer bg-indigo-500" type="submit" value="Login" />
    </form>
    <KakaoLogin/>
    <div className="w-10/12 mx-auto mt-6 border border-gray-300" ></div>
    <button className="mt-6 p-1.5 text-white bg-indigo-500" onClick={() => navigate(`/join`)}>Join</button>
  </div>  
  )
}
