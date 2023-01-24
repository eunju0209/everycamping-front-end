import { createContext, ReactNode, useContext, useState } from 'react';

export type UserInfo = {
  email: string;
  nickName: string;
  phoneNumber: string;
  customerId: number;
  type: 'none' | 'user' | 'seller' | 'admin';
};

export type UserInfoContextType = {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
};

type UserInfoProviderProps = {
  children: ReactNode;
};

const UserInfoContext = createContext<UserInfoContextType | null>(null);

const UserInfoProvider = (props: UserInfoProviderProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    nickName: '',
    phoneNumber: '',
    customerId: 0,
    type: 'none',
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
