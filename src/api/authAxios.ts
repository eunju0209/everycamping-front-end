import axios, { AxiosRequestConfig } from 'axios';
import { storedToken } from '../store/accessToken';
import { getCookie } from '../store/cookie';
import { getAdminNewToken, getSellerNewToken, getUserNewToken } from './userService';

// axios.defaults.withCredentials = true;

export const authAxios = axios.create();

authAxios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (config.headers) {
      config.headers = {
        Authorization : getCookie('accessToken')
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.error('response error :', error)

    const errorAPI = error.config
    const refreshToken = getCookie('refreshToken')

    
    if (error.response.status === 403 && errorAPI.retry === undefined && refreshToken) {
      errorAPI.retry = true

      if (getCookie('LoginType') === 'user') {
        await getUserNewToken()
      } else if (getCookie('LoginType') === 'seller') {
        await getSellerNewToken()
      } else if (getCookie('LoginType') === 'admin') {
        await getAdminNewToken()
      }
      

    //   // return await authAxios(errorAPI)
    }
    return Promise.reject(error);
  }
);
