import axios from 'axios';
import { loginInfoType } from '../components/Login/LoginComp';

export const userLogin = async (loginInfo : loginInfoType) => {
  try {
    return await axios.post('/customers/signin',loginInfo)
  } catch(error) {
    console.error(error)
  }
}

export const sellerLogin = async (loginInfo : loginInfoType) => {
  try {
    return await axios.post('/sellers/signin',loginInfo)
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
