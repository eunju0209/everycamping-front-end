import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import SockJs from 'sockjs-client'
import { messageDataType } from '../components/Chatting/Chatting';
import { getCookie } from '../store/cookie';

const stomp = Stomp.over(() => new SockJs('/api/websocket'));

export const getRoomId = async () => {
  const result = await axios.post('/api/questions');
  return result.data
}

export const stompConnect = (roomId: string, setMessages: React.Dispatch<React.SetStateAction<messageDataType[]>>) => {

  try {
    // stomp.debug = () => {}
    stomp.connect(
    {
      Authorization : getCookie('accessToken')
    }
    , (frame:string) => {
      
      console.log('Connected : ' + frame);
      stompSubscribe(roomId, setMessages);
    }, 
    (error: any) => {
      console.error(error)
      console.log('a')
    }
    );
  } catch (error) {
    console.error(error)
  }
};

const stompSubscribe = (roomId: string, setMessages: React.Dispatch<React.SetStateAction<messageDataType[]>>) => {
  // stomp.debug = () => {}
    stomp.subscribe(
        `/topic/questions/${roomId}`,
        (data : {body : string}) => {
          const newMessage = JSON.parse(data.body);
          console.log(newMessage)
            setMessages(prev =>  [...prev, newMessage] );
            console.log('subscribe : ', data);
        },
    );
}

export const sendMessage = (roomId: string, message: string, userType:string) => {
  // stomp.debug = () => {}
  const data = {
    content: message,
    userType: userType
  };
  stomp.send(`/questions/${roomId}`,
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