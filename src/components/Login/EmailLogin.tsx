import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailLoginForm = () => {
  const [ email, setEmail ] = useState('');
  const [password, setPassword] = useState('');
  const navi = useNavigate()

  const onChange = () => {

  }

return (
  <div className="flex flex-col justify-center mx-auto w-60" >
    <p className="flex justify-center text-4xl" >로그인</p>
    <form className="flex flex-col mt-10">
      <input className="p-2" name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
      <input className="mt-2 p-2" name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
      <input className="mt-5 p-1.5 text-white cursor-pointer bg-indigo-500" type="submit" value="Login" />
    </form>
    <button className="mt-4 p-1.5 text-white bg-indigo-500">Kakao Login</button>
    <div className="w-10/12 mx-auto mt-6 border border-gray-300" ></div>
    <button className="mt-6 p-1.5 text-white bg-indigo-500" onClick={() => navi(`/join`)}>Join</button>
  </div>  
  )
}

export default EmailLoginForm