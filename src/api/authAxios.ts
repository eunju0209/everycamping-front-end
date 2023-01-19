import axios, { AxiosRequestConfig } from 'axios';
import { storedToken } from '../store/accessToken';
import { getUserNewToken } from './userService';


axios.defaults.withCredentials = true;

export const authAxios = axios.create();

authAxios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (config.headers) {
      config.headers = {
        Authorization : storedToken.Token
      }
      
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

authAxios.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    console.log(error.config)
    await getUserNewToken()

    return Promise.reject(error)
  }
)