import axios from 'axios';
import SockJs from 'sockjs-client'
import StompJs from 'stompjs'
import { authAxios } from './authAxios';

const sock = new SockJs('/api/websocket');
const stomp = StompJs.over(sock);

export const getRoomId = async () => {
    const result = await axios.post('/api/questions');
    return result.data
}

export const stompConnect = (roomId : string, setMessages : React.Dispatch<React.SetStateAction<string[]>>) => {
  try {
        stomp.connect(
            {}
            // token
            , (frame) => {
                console.log('Connected : ' + frame);
                stompSubscribe(roomId, setMessages);
            }
        );
  } catch (err) {
    console.error(err)
    }
};

const stompSubscribe = (roomId : string, setMessages : React.Dispatch<React.SetStateAction<string[]>>) => {
    stomp.subscribe(
        `/topic/questions/${roomId}`,
        (data) => {
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
            Authorization: "this is token"
        }
        ,JSON.stringify(data));
};
