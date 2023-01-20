import axios, { AxiosRequestConfig } from 'axios';
import { storedToken } from '../store/accessToken';
import { getCookie } from '../store/cookie';
import { getUserNewToken } from './userService';

axios.defaults.withCredentials = true;

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
    if (error.response.status === 403) {
      await getUserNewToken()
      // authAxios(error.config)
      // await getSellerNewToken()
    }
    return Promise.reject(error);
  }
);
