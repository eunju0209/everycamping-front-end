import axios, { AxiosRequestConfig } from 'axios';
import { storedToken } from '../store/accessToken';
import { getUserNewToken } from './userService';


axios.defaults.withCredentials = true;

export const authAxios = axios.create();

authAxios.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (config.headers) {
      config.headers = {
        Authorization : 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0YXJwVEFZSzNzbUFrTWJzdnh3d0pQcHJ3Znd3a1g1Q01lVE9lUFc3V2tJPSIsImp0aSI6IkdNWE1IZ0hOQXkyNmtWM3pMZGJoWlE9PSIsInJvbGVzIjoiQ1VTVE9NRVIiLCJpYXQiOjE2NzQxMTAyODIsImV4cCI6MTY3NDExMjA4Mn0.PeQqlTgRGGG68btMGOAXVW1elysTX2XyiFGcVh5LhYw'
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
    console.log(error)
    console.log(error.config)
    await getUserNewToken()
    // await getSellerNewToken()
    return Promise.reject(error)
  }
)