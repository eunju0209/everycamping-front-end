import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import SockJs from 'sockjs-client'
import StompJs from 'stompjs'
import { getCookie } from '../store/cookie';
import { authAxios } from './authAxios';

const sock = new SockJs('/api/websocket');
const stomp = StompJs.over(sock);
// const stomp = Stomp.over(sock);
// const stomp = StompJs.over(new WebSocket('ws://ec2-43-200-2-48.ap-northeast-2.compute.amazonaws.com/websocket')
      //  );



export const getRoomId = async () => {
  const result = await axios.post('/api/questions');
  return result.data
}

export const stompConnect = (roomId: string, setMessages: React.Dispatch<React.SetStateAction<string[]>>) => {
  console.log(stomp)
  stomp.connect({
    //  login: '',
    // passcode: '',
   }
      // getCookie('accessToken')
      , (frame) => {
        
        console.log('Connected : ' + frame);
        stompSubscribe(roomId, setMessages);
      }, 
      (error: any) => {
        console.error(error)
        console.log('a')
      }
  );
};

const stompSubscribe = (roomId : string, setMessages : React.Dispatch<React.SetStateAction<string[]>>) => {
    stomp.subscribe(
        `/topic/questions/${roomId}`,
        (data: { body: string; }) => {
            const newMessage = JSON.parse(data.body).content;
            setMessages(prev =>  [...prev, newMessage] );
            console.log('subscribe : ', data);
        },
    );
}

export const stompDisConnect = () => {
    try {
        stomp.disconnect(() => {
  console.log("채팅이 종료 되었습니다.");
  });
    } catch (err) {
    }
};

export const sendMessage = (roomId : string, message : string) => {
    const data = {
        content: message
    };
    stomp.send(`/questions/${roomId}`,
        {
            Authorization: "accessToken"
        }
        ,JSON.stringify(data));
};
