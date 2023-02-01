import { Cookies } from 'react-cookie';

const cookies = new Cookies()

type CookieOption = {
  path: string;
}

export const setCookie = (name: string, value: string, option?: CookieOption) => {

  return cookies.set(name, value, {...option})
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const removeCookie = (name: string) => {
  
  return cookies.remove(name)
}