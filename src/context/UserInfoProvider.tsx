import { createContext, ReactNode, useContext, useState } from 'react';

export type UserInfo = {
  email: string;
  nickName: string;
  phoneNumber: string;
};

export type UserInfoContext = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

type UserInfoProviderProps = {
  children: ReactNode;
};

export const UserInfoContext = createContext<UserInfoContext | null>(null);

const UserInfoProvider = (props: UserInfoProviderProps) => {
  const [userInfo, setUserInfo] = useState({
    //샘플 데이터
    email: 'cow_boy27@naver.com',
    nickName: '재재',
    phoneNumber: '010-3558-3752',
  });
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {props.children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;

export const useUserInfo = () => {
  const value = useContext(UserInfoContext);

  if (!value) {
    throw new Error('cannot find userInfo');
  }

  return value;
};
