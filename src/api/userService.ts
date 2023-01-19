import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { JoinEmailCompType } from '../components/Join/JoinEmailComp';
import { loginInfoType } from '../components/Login/LoginComp';
import { storedToken } from '../store/accessToken';
import { getCookie, setCookie } from '../store/cookie';
import { authAxios } from './authAxios';

axios.defaults.withCredentials = true;

//common
export const postEmailCheck = async (email: string) => {
  try {
    const result = await axios.post(`/api/common/auth`, {
      email
    })
    console.log(result)
    return result

  } catch(error) {
    console.error(error)
  }
}
export const postEmailCheckReturn = async (code: string) => {
  try {
    const result = await axios.post(`/api/common/auth`, {
      code
    })
    console.log(result)
    return result

  } catch(error) {
    console.error(error)
  }
}



// user
export const postUserJoin = async (joinInfo : JoinEmailCompType) => {
  try {
    const result = await axios.post(`/api/customers/signup`,
      joinInfo
    )
    return result

  } catch(error) {
    console.error(error)
  }
}

export const postUserLogin = async (loginInfo: loginInfoType) => {
  
  const result = await axios.post(`/api/customers/signin`, loginInfo);

    
  storedToken.Token = result.data.accessToken;
  setCookie('refreshToken', result.data.refreshToken);

  console.log(storedToken.Token)
}

export const postUserSocialLogin = async (email: string) => {
  try {
    const result = await axios.post(`/api/customers/signin`, { email })

    storedToken.Token = result.data.accessToken;
    setCookie('refreshToken', result.data.refreshToken);

  } catch(error) {
    console.error(error)
  }
}
export const getUserNewToken = async () => {
  try {
    const result = await axios.post(`/api/customers/reissue`,{
      accessToken : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0YXJwVEFZSzNzbUFrTWJzdnh3d0pQcHJ3Znd3a1g1Q01lVE9lUFc3V2tJPSIsImp0aSI6IkdNWE1IZ0hOQXkyNmtWM3pMZGJoWlE9PSIsInJvbGVzIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzQxMDc3MzgsImV4cCI6MTY3NDEwOTUzOH0.93DOSKwinCxevHpNzXD5q5Km8cA-qByS9IdSk7iNyEc',
      refreshToken : getCookie('refreshToken')
    })

    storedToken.Token = result.data.accessToken;
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

export const putUserInfo = async () => {
  try {
    const result = await axios.put(`/api/customers/info`)
    console.log(result)
    return result

  } catch (error) {
    console.error(error)
  }
}
export const patchUserPassword = async () => {
  try {
    const result = await axios.patch(`/api/customers/password`)
    console.log(result)
    return result

  } catch (error) {
    console.error(error)
  }
}


// seller
export const postSellerJoin = async (joinInfo : JoinEmailCompType) => {
  try {
    const result = await axios.post(`/api/sellers/signup`, joinInfo)

    return result

  } catch(error) {
    console.error(error)
  }
}


export const postSellerLogin = async (loginInfo : loginInfoType) => {
 
  const result = await axios.post(`/api/sellers/signin`, loginInfo)

  storedToken.Token = result.data.accessToken;
  setCookie('refreshToken', result.data.refreshToken);
  
  console.log(storedToken.Token)

}

export const getSellerNewToken = async () => {
  try {
    const result = await axios.post(`/api/customers/reissue`,{
      accessToken : storedToken.Token,
      refreshToken : getCookie('refreshToken')
    })

    storedToken.Token = result.data.accessToken;
    setCookie('refreshToken', result.data.refreshToken);

  } catch (error) {
    console.log(error)
  }
}
export const getSellerLogOut = async () => {
  try {
    const result = await axios.post(`/api/sellers/signout`)
    console.log(result)
    return result

  } catch(error) {
    console.error(error)
  }
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

export const putSellerInfo = async () => {
  try {
    const result = await axios.put(`/api/sellers/info`)
    console.log(result)
    return result

  } catch (error) {
    console.error(error)
  }
}
export const patchSellerPassword = async () => {
  try {
    const result = await axios.get(`/api/sellers/password`)
    console.log(result)
    return result
    
  } catch (error) {
    console.error(error)
  }
}
