import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getUserInfo } from '../api/userService';
import { getCookie } from './cookie';

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
  useEffect(() => {
    (async () => {
      if (userInfo.email === '') {
        if (getCookie('LoginType') === 'seller') {
          const data = await getUserInfo();
          setUserInfo({
            email: data.email,
            nickName: data.nickName,
            phoneNumber: data.phoneNumber,
            customerId: data.customerId,
            type: 'seller',
          });
        } else if (getCookie('LoginType') === 'user') {
          const data = await getUserInfo();
          setUserInfo({
            email: data.email,
            nickName: data.nickName,
            phoneNumber: data.phoneNumber,
            customerId: data.customerId,
            type: 'user',
          });
        }
      }
    })();
  }, []);
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
