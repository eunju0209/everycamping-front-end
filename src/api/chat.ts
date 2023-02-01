import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import SockJs from 'sockjs-client';
import { messageDataType } from '../components/Chatting/Chatting';
import { getCookie } from '../store/cookie';
import { authAxios } from './authAxios';
import { PROXY } from './productsService';


const stomp = Stomp.over(() => new SockJs(`${PROXY}/websocket`));

export const getRoomId = async (
  requesterEmail: string,
  requesterUserType : 'CUSTOMER' | 'SELLER' | 'ADMIN',
  requesteeEmail : string,
  requesteeUserType : 'CUSTOMER' | 'SELLER' | 'ADMIN'
) => {
  const result = await axios.post(`${PROXY}/chat-rooms`, {
    requesterEmail,
    requesterUserType,
    requesteeEmail,
    requesteeUserType,
  });
  return result.data
}

export const stompConnect = (
  roomId: string,
  setMessages: React.Dispatch<React.SetStateAction<messageDataType[]>>
) => {
  try {
    stomp.debug = () => {}
    stomp.connect(
    {
      Authorization : getCookie('accessToken')
    }
    , () => {
      stompSubscribe(roomId, setMessages);
    }, 
    (error: any) => {
      console.error(error)
    }

    );
  } catch (error) {
    console.error(error);
  }
};


const stompSubscribe = (roomId: string, setMessages: React.Dispatch<React.SetStateAction<messageDataType[]>>) => {
  stomp.debug = () => {}
    stomp.subscribe(
        `/topic/chat-rooms/${roomId}`,
        (data : {body : string}) => {
          const newMessage = JSON.parse(data.body);
            setMessages(prev =>  [...prev, newMessage] );
        },
    );
}

export const sendMessage = (roomId: string, message: string, userType:string) => {
  stomp.debug = () => {}

  const data = {
    content: message,
    userType: userType,
  };
  stomp.send(`/chat-rooms/${roomId}`,
  {
    Authorization: getCookie('accessToken')
  },
  JSON.stringify(data));
};

export const stompDisConnect = () => {
  stomp.debug = () => {}
    stomp.disconnect(() => {
    console.log("채팅이 종료 되었습니다.");
    });
};

export const getChatList = async (userEmail : string ,userType : 'CUSTOMER' | 'SELLER' | 'ADMIN') => {
  const result = await authAxios.get(`${PROXY}/chat-rooms?userEmail=${userEmail}&userType=${userType}`)
  return result.data
}

export const getChatMessageList = async (chatRoomId:number) => {
  const result = await authAxios.get(`${PROXY}/chat-rooms/${chatRoomId}/messages`);
  return result.data
}
export const deleteChatList = async (chatRoomId:number) => {
  const result = await authAxios.delete(`${PROXY}/chat-rooms/${chatRoomId}`);
  return result.data
}

