import axios from 'axios';
import { JoinEmailCompType } from '../components/Join/JoinEmailComp';
import { loginInfoType } from '../components/Login/LoginComp';
import { NewUserInfoType } from '../pages/User/UserInfo';
import { getCookie, removeCookie, setCookie } from '../store/cookie';
import { authAxios } from './authAxios';

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

  setCookie('accessToken', result.data.accessToken, {
    path:'/'
  });
  setCookie('refreshToken', result.data.refreshToken, {
    path:'/'
  });
  setCookie('LoginType', 'user');
  console.log('login 성공')
}

export const postUserSocialLogin = async (email: string, nickName: string) => {
    const result = await axios.post(`/api/customers/signin/social/kakao`, { email, nickName })

  setCookie('accessToken', result.data.accessToken, {
    path:'/'
  });
  setCookie('refreshToken', result.data.refreshToken, {
    path:'/'
  });
  setCookie('LoginType', 'user');
  console.log('social login 성공')
}

export const getUserNewToken = async () => {
  try { 
    const result = await axios.post(`/api/customers/reissue`,{
      accessToken : getCookie('accessToken'),
      refreshToken : getCookie('refreshToken')
    })
    setCookie('accessToken', result.data.accessToken, {
      path:'/'
    });
    setCookie('refreshToken', result.data.refreshToken, {
      path:'/'
    });
    setCookie('LoginType', 'user');
  } catch (error) {
    console.log('토큰 재발급 실패')
    location.assign('http://localhost:5173/login')
    removeCookie('LoginType');
    removeCookie('accessToken');
    removeCookie('refreshToken');
  }
}
export const getUserLogOut = async () => {
    const result = await authAxios.get(`/api/customers/signout`)
    return result

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
    return result
}
export const patchUserPassword = async (newPassword:string , oldPassword:string) => {
    const result = await authAxios.patch(`/api/customers/password`,{
      newPassword,
      oldPassword
    })
    return result
}


// seller
export const postSellerJoin = async (joinInfo : JoinEmailCompType) => {
    const result = await axios.post(`/api/sellers/signup`, joinInfo)
    return result
}

export const postSellerLogin = async (loginInfo : loginInfoType) => {
  const result = await axios.post(`/api/sellers/signin`, loginInfo)

  setCookie('accessToken', result.data.accessToken,{
      path:'/'
    });
  setCookie('refreshToken', result.data.refreshToken,{
      path:'/'
    });
  setCookie('LoginType', 'seller');

    console.log('Seller login 성공')
}

export const getSellerNewToken = async () => {
  try {
    const result = await axios.post(`/api/customers/reissue`,{
      accessToken : getCookie('accessToken'),
      refreshToken : getCookie('refreshToken')
    })

  setCookie('accessToken', result.data.accessToken,{
      path:'/'
    });
    setCookie('refreshToken', result.data.refreshToken,{
      path:'/'
    });
    setCookie('LoginType', 'seller');

  } catch (error) {
    console.log('토큰 재발급 실패')
    location.assign('http://localhost:5173/login')
    removeCookie('LoginType');
    removeCookie('accessToken');
    removeCookie('refreshToken');
  }
}
export const getSellerLogOut = async () => {
    const result = await authAxios.get(`/api/sellers/signout`)
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
    return result
}

export const patchSellerPassword = async (newPasswordEdit:string, oldPassword:string) => {
    const result = await authAxios.patch(`/api/sellers/password`, {
      newPasswordEdit,
      oldPassword
    })
    return result
}

// admin

export const postAdminLogin = async (loginInfo: loginInfoType) => {
  const result = await axios.post(`/api/admins/signin`, loginInfo);

  setCookie('accessToken', result.data.accessToken, {
    path:'/'
  });
  setCookie('refreshToken', result.data.refreshToken, {
    path:'/'
  });
  setCookie('LoginType', 'admin');

  console.log('Admin login 성공')
}
export const getAdminNewToken = async () => {
  try { 
    const result = await axios.post(`/api/admins/reissue`,{
      accessToken : getCookie('accessToken'),
      refreshToken : getCookie('refreshToken')
    })
    setCookie('accessToken', result.data.accessToken, {
      path:'/'
    });
    setCookie('refreshToken', result.data.refreshToken, {
      path:'/'
    });
    setCookie('LoginType', 'admin');
  } catch (error) {
    console.log('토큰 재발급 실패')
    location.assign('http://localhost:5173/login')
    removeCookie('LoginType');
    removeCookie('accessToken');
    removeCookie('refreshToken');
  }
}

export const getAdminLogOut = async () => {
    const result = await authAxios.get(`/api/admins/signout`)
    return result
}