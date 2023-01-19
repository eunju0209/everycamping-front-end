import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
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
  setCookie('accessToken', result.data.accessToken);
  setCookie('refreshToken', result.data.refreshToken);

  console.log(storedToken.Token)
}

export const postUserSocialLogin = async (email: string) => {
    const result = await axios.post(`/api/customers/signin`, { email })

    // storedToken.Token = result.data.accessToken;
    setCookie('accessToken', result.data.accessToken);
    setCookie('refreshToken', result.data.refreshToken);
}

export const getUserNewToken = async () => {
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
export const getUserLogOut = async () => {
  try {
    const result = await axios.get(`/api/customers/signout`)
    console.log(result)
    return result

  } catch(error) {
    console.error(error)
  }
}
const getUserInfo = async () => {
  try {
    const result = await authAxios.get(`/api/customers/info`)
    console.log(result)
    return result

  } catch (error) {
    console.error(error)
  }
}
export const useGetUserInfo = (accessToken : string, options?: (Omit<UseQueryOptions<AxiosResponse<any, any> | undefined, unknown, AxiosResponse<any, any> | undefined, string[]>, "initialData" | "queryFn" | "queryKey"> & { initialData?: (() => undefined) | undefined; }) | undefined) => {
  useQuery(['@userInfo'], () => getUserInfo(),options)
}

export const putUserInfo = async (newUserInfo : NewUserInfoType) => {
    const result = await axios.put(`/api/customers/info`,{newUserInfo})
    console.log(result)
    return result
}
export const patchUserPassword = async (passwordEdit:string , oldPassword:string) => {
    const result = await axios.patch(`/api/customers/password`,{
      passwordEdit,
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
  
  console.log(storedToken.Token)
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
    const result = await axios.post(`/api/sellers/signout`)
    console.log(result)
    return result
}
const getSellerInfo = async (accessToken : string) => {
  try {
    const result = await axios.get(`/api/sellers/info`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    console.log(result)
    return result

  } catch (error) {
    console.error(error)
  }
}
export const useGetSellerInfo = (accessToken : string , options?: (Omit<UseQueryOptions<AxiosResponse<any, any> | undefined, unknown, AxiosResponse<any, any> | undefined, string[]>, "initialData" | "queryFn" | "queryKey"> & { initialData?: (() => undefined) | undefined; }) | undefined) => {
  useQuery(['@sellerInfo', accessToken], () => getSellerInfo(accessToken),options)
}

export const putSellerInfo = async (newSellerInfo:NewUserInfoType) => {
    const result = await axios.put(`/api/sellers/info`,{newSellerInfo})
    console.log(result)
    return result
}

export const patchSellerPassword = async (newPasswordEdit:string, oldPassword:string) => {

    const result = await axios.patch(`/api/sellers/password`, {
      newPasswordEdit,
      oldPassword
    })
    console.log(result)
    return result

}
