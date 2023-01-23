import axios from 'axios';
import { JoinEmailCompType } from '../components/Join/JoinEmailComp';
import { loginInfoType } from '../components/Login/LoginComp';
import { NewUserInfoType } from '../pages/User/UserInfo';
import { storedToken } from '../store/accessToken';
import { getCookie, setCookie } from '../store/cookie';
import { authAxios } from './authAxios';

axios.defaults.withCredentials = true;

//common
export const postEmailCheck = async (email: string) => {
    const result = await axios.post(`/api/commons/auth-request`, {email})
    return result
}
export const postEmailCheckReturn = async (email: string,code: string) => {
    const result = await axios.post(`/api/commons/auth-verify`, {email,code})
    return result
}

// user
export const postUserJoin = async (joinInfo : JoinEmailCompType) => {
    const result = await axios.post(`/api/customers/signup`,joinInfo)
    return result
}

export const postUserLogin = async (loginInfo: loginInfoType) => {
  const result = await axios.post(`/api/customers/signin`, loginInfo);

  // storedToken.Token = result.data.accessToken;
  setCookie('accessToken', result.data.accessToken, {
    path:'/'
  });
  setCookie('refreshToken', result.data.refreshToken, {
    path:'/'
  });
  console.log('login 성공')
}

export const postUserSocialLogin = async () => {
    const result = await axios.get(`/api/customers/signin/social/kakao`)
    // const result = await axios.post(`/api/customers/signin/kakao`, { email })

 // storedToken.Token = result.data.accessToken;
  setCookie('accessToken', result.data.accessToken, {
    path:'/'
  });
  setCookie('refreshToken', result.data.refreshToken, {
    path:'/'
  });
  console.log('social login 성공')
}

export const getUserNewToken = async () => {
  try { 
    const result = await axios.post(`/api/customers/reissue`,{
      accessToken : getCookie('accessToken'),
      refreshToken : getCookie('refreshToken')
    })
    // storedToken.Token = result.data.accessToken;
    setCookie('accessToken', result.data.accessToken, {
      path:'/'
    });
    setCookie('refreshToken', result.data.refreshToken, {
      path:'/'
    });
  } catch (error) {
    console.log('토큰 재발급 실패')
    console.error('newToken error : ', error)
    // location.assign('http://localhost:5173/login')
  }
}
export const getUserLogOut = async () => {
  try {
    const result = await authAxios.get(`/api/customers/signout`)
    console.log(result)
    return result

  } catch(error) {
    console.error(error)
  }
}
export const getUserInfo = async () => {
  try {
    const result = await authAxios.get(`/api/customers/info`)
    console.log(result)
    return result.data

  } catch (error) {
    console.error(error)
  }
}

export const putUserInfo = async (newUserInfo : NewUserInfoType) => {
    const result = await authAxios.put(`/api/customers/info`,newUserInfo)
    console.log(result)
    return result
}
export const patchUserPassword = async (newPassword:string , oldPassword:string) => {
    const result = await authAxios.patch(`/api/customers/password`,{
      newPassword,
      oldPassword
    })
    console.log(result)
    return result
}


// seller
export const postSellerJoin = async (joinInfo : JoinEmailCompType) => {
    const result = await axios.post(`/api/sellers/signup`, joinInfo)
    return result
}

export const postSellerLogin = async (loginInfo : loginInfoType) => {
  const result = await axios.post(`/api/sellers/signin`, loginInfo)

  // storedToken.Token = result.data.accessToken;
  setCookie('accessToken', result.data.accessToken);
  setCookie('refreshToken', result.data.refreshToken);
  
  // console.log(storedToken.Token)
}

export const getSellerNewToken = async () => {
  try {
    const result = await axios.post(`/api/customers/reissue`,{
      accessToken : getCookie('accessToken'),
      refreshToken : getCookie('refreshToken')
    })

  // storedToken.Token = result.data.accessToken;
  setCookie('accessToken', result.data.accessToken);
  setCookie('refreshToken', result.data.refreshToken);

  } catch (error) {
    console.log(error)
  }
}
export const getSellerLogOut = async () => {
    const result = await authAxios.post(`/api/sellers/signout`)
    console.log(result)
    return result
}
export const getSellerInfo = async () => {
  try {
    const result = await authAxios.get(`/api/sellers/info`)
    return result.data

  } catch (error) {
    console.error(error)
  }
}

export const putSellerInfo = async (newSellerInfo:NewUserInfoType) => {
    const result = await authAxios.put(`/api/sellers/info`,{newSellerInfo})
    console.log(result)
    return result
}

export const patchSellerPassword = async (newPasswordEdit:string, oldPassword:string) => {

    const result = await authAxios.patch(`/api/sellers/password`, {
      newPasswordEdit,
      oldPassword
    })
    console.log(result)
    return result

}
