import axios from 'axios';
import { loginInfoType } from '../components/Login/LoginComp';


//common
export const postEmailCheck = async (email: string) => {
  try {
    return await axios.post('common/auth',)
  } catch(error) {
    console.error(error)
  }
}
export const postEmailCheckReturn = async () => {
  try {
    return await axios.post('common/auth',)
  } catch(error) {
    console.error(error)
  }
}
export const postNickNameCheck = async () => {
  try {
    return await axios.post('common/auth',)
  } catch(error) {
    console.error(error)
  }
}


// user
export const postUserJoin = async () => {
  try {
    return await axios.post('customers/signup',)
  } catch(error) {
    console.error(error)
  }
}
export const postUserLogin = async (loginInfo : loginInfoType) => {
  try {
    return await axios.post('/customers/signin',loginInfo)
  } catch(error) {
    console.error(error)
  }
}
export const postUserSocialLogin = async (email:string) => {
  try {
    return await axios.post('/customers/signin',email)
  } catch(error) {
    console.error(error)
  }
}
export const getUserLogOut = async () => {
  try {
    return await axios.get('customers/signout')
  } catch(error) {
    console.error(error)
  }
}
export const getUserInfo = async (accessToken) => {
  try {
    return await axios.get('/customers/info', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    console.error(error)
  }
}
export const putUserInfo = async () => {
  try {
    return await axios.put('/customers/info')
  } catch (error) {
    console.error(error)
  }
}
export const patchUserPassword = async () => {
  try {
    return await axios.patch('customers/password')
  } catch (error) {
    console.error(error)
  }
}


// seller
export const postSellerJoin = async () => {
  try {
    return await axios.post('sellers/signup',)
  } catch(error) {
    console.error(error)
  }
}
export const postSellerLogin = async (loginInfo : loginInfoType) => {
  try {
    return await axios.post('/sellers/signin',loginInfo)
  } catch(error) {
    console.error(error)
  }
}
export const getSellerLogOut = async () => {
  try {
    return await axios.post('sellers/signout')
  } catch(error) {
    console.error(error)
  }
}
export const getSellerInfo = async (accessToken) => {
  try {
    return await axios.get('sellers/info', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  } catch (error) {
    console.error(error)
  }
}
export const putSellerInfo = async () => {
  try {
    return await axios.put('/sellers/info')
  } catch (error) {
    console.error(error)
  }
}
export const patchSellerPassword = async () => {
  try {
    return await axios.get('sellers/password')
  } catch (error) {
    console.error(error)
  }
}
