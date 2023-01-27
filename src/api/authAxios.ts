import axios, { AxiosRequestConfig } from 'axios';
import { getCookie } from '../store/cookie';
import { getAdminNewToken, getSellerNewToken, getUserNewToken } from './userService';

export const authAxios = axios.create();

authAxios.interceptors.request.use(
   function (config) {
    if (config.headers) {
      config.headers.Authorization = getCookie('accessToken')
      // config.headers['Content-Type'] = 'application/json'
      //   = {
      //   Authorization: getCookie('accessToken'),
      //   'Content-Type': 'application/json'
      // }
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

      if (getCookie('LoginType') === 'user') {
        await getUserNewToken().then(async () => await authAxios.request(errorAPI))

      } else if (getCookie('LoginType') === 'seller') {
        await getSellerNewToken().then(async () => await authAxios.request(errorAPI))
        
      } else if (getCookie('LoginType') === 'admin') {
        await getAdminNewToken().then(async () => await authAxios.request(errorAPI))
      }
    }
    return Promise.reject(error);
  }
);
