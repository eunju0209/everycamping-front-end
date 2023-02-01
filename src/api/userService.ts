import axios from 'axios';
import { JoinEmailCompType } from '../components/Join/JoinEmailComp';
import { loginInfoType } from '../components/Login/LoginComp';
import { getCookie, removeCookie, setCookie } from '../store/cookie';
import { UserInfoType } from '../store/UserInfoProvider';
import { authAxios } from './authAxios';
import { PROXY } from './productsService';

//common
export const postEmailCheck = async (email: string) => {
  const result = await axios.post(`${PROXY}/commons/auth-request`, { email });
  return result;
};
export const postEmailCheckReturn = async (email: string, code: string) => {
  const result = await axios.post(`${PROXY}/commons/auth-verify`, {
    email,
    code,
  });
  return result;
};

// user
export const postUserJoin = async (joinInfo: JoinEmailCompType) => {
  const result = await axios.post(`${PROXY}/customers/signup`, joinInfo);
  return result;
};

export const postUserLogin = async (loginInfo: loginInfoType) => {
  const result = await axios.post(`${PROXY}/customers/signin`, loginInfo);

  setCookie('accessToken', result.data.accessToken, {
    path: '/',
  });
  setCookie('refreshToken', result.data.refreshToken, {
    path: '/',
  });

  setCookie('LoginType', 'user',{
    path:'/'
  });
}


export const getUserNewToken = async () => {
  try {
    const result = await axios.post(`${PROXY}/customers/reissue`, {
      accessToken: getCookie('accessToken'),
      refreshToken: getCookie('refreshToken'),
    });
    setCookie('accessToken', result.data.accessToken, {
      path: '/',
    });
    setCookie('refreshToken', result.data.refreshToken, {
      path: '/',
    });
    setCookie('LoginType', 'user',{
      path:'/'
    });
    console.log('토큰 재발급 성공')
  } catch (error) {
    console.log('토큰 재발급 실패');
    location.assign('http://localhost:5173/login');
    removeCookie('LoginType');
    removeCookie('accessToken');
    removeCookie('refreshToken');
  }
};
export const getUserLogOut = async () => {
  await authAxios.get(`${PROXY}/customers/signout`);
  removeCookie('LoginType');
  removeCookie('accessToken');
  removeCookie('refreshToken');
  console.log('로그 아웃 성공')
}
export const getUserInfo = async () => {
  try {
    const result = await authAxios.get(`${PROXY}/customers/info`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const putUserInfo = async (newUserInfo: UserInfoType) => {
  const result = await authAxios.put(`${PROXY}/customers/info`, newUserInfo);
  return result;
};
export const patchUserPassword = async (
  newPassword: string,
  oldPassword: string
) => {
  const result = await authAxios.patch(`${PROXY}/customers/password`, {
    newPassword,
    oldPassword,
  });
  return result;
};

// seller
export const postSellerJoin = async (joinInfo: JoinEmailCompType) => {
  const result = await axios.post(`${PROXY}/sellers/signup`, joinInfo);
  return result;
};

export const postSellerLogin = async (loginInfo: loginInfoType) => {
  const result = await axios.post(`${PROXY}/sellers/signin`, loginInfo);

  setCookie('accessToken', result.data.accessToken,{
      path:'/'
    });
  setCookie('refreshToken', result.data.refreshToken,{
      path:'/'
    });
  setCookie('LoginType', 'seller',{
      path:'/'
    });
}

export const getSellerNewToken = async () => {
  try {
    const result = await axios.post(`${PROXY}/customers/reissue`, {
      accessToken: getCookie('accessToken'),
      refreshToken: getCookie('refreshToken'),
    });

    setCookie('accessToken', result.data.accessToken, {
      path: '/',
    });
    setCookie('refreshToken', result.data.refreshToken, {
      path: '/',
    });

    setCookie('LoginType', 'seller',{
      path:'/'
    });


  } catch (error) {
    console.log('토큰 재발급 실패');
    location.assign('http://localhost:5173/login');
    removeCookie('LoginType');
    removeCookie('accessToken');
    removeCookie('refreshToken');
  }
};
export const getSellerLogOut = async () => {
  await authAxios.get(`${PROXY}/sellers/signout`);
  removeCookie('LoginType');
  removeCookie('accessToken');
  removeCookie('refreshToken');
};
export const getSellerInfo = async () => {
  try {
    const result = await authAxios.get(`${PROXY}/sellers/info`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const putSellerInfo = async (newSellerInfo: UserInfoType) => {
  const result = await authAxios.put(`${PROXY}/sellers/info`, newSellerInfo);
  return result;
};

export const patchSellerPassword = async (
  newPasswordEdit: string,
  oldPassword: string
) => {
  const result = await authAxios.patch(`${PROXY}/sellers/password`, {
    newPasswordEdit,
    oldPassword,
  });
  return result;
};

// admin

export const postAdminLogin = async (loginInfo: loginInfoType) => {
  const result = await axios.post(`${PROXY}/admins/signin`, loginInfo);

  setCookie('accessToken', result.data.accessToken, {
    path: '/',
  });
  setCookie('refreshToken', result.data.refreshToken, {
    path: '/',
  });
  setCookie('LoginType', 'admin',{
      path:'/'
    });

  console.log('Admin login 성공');
};
export const getAdminNewToken = async () => {
  try {
    const result = await axios.post(`${PROXY}/admins/reissue`, {
      accessToken: getCookie('accessToken'),
      refreshToken: getCookie('refreshToken'),
    });
    setCookie('accessToken', result.data.accessToken, {
      path: '/',
    });
    setCookie('refreshToken', result.data.refreshToken, {
      path: '/',
    });
    setCookie('LoginType', 'admin',{
      path:'/'
    });
  } catch (error) {
    console.log('토큰 재발급 실패');
    location.assign('http://localhost:5173/login');
    removeCookie('LoginType');
    removeCookie('accessToken');
    removeCookie('refreshToken');
  }
};

export const getAdminLogOut = async () => {
  await authAxios.get(`${PROXY}/admins/signout`);
  removeCookie('LoginType');
  removeCookie('accessToken');
  removeCookie('refreshToken');
};
