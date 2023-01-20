import SockJs from 'sockjs-client'
import StompJs from 'stompjs'
import { authAxios } from './authAxios';

const sock = new SockJs('/api/websocket');
const stomp = StompJs.over(sock);

export const getRoomId = async () => {
    const result = await authAxios.get('/api/questions');
    return result.data.questionRoomId
}

export const stompConnect = (roomId : number, setMessages : React.Dispatch<React.SetStateAction<string[]>>) => {
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
    }
};

const stompSubscribe = (roomId : number, setMessages : React.Dispatch<React.SetStateAction<string[]>>) => {
    stomp.subscribe(
        `/topic/questions/${roomId}`,
        (data) => {
            const newMessage = JSON.parse(data.body).content;
            setMessages(prev => [...prev, newMessage]);
            console.log(data);
        },
    );
}

export const stompDisConnect = () => {
    try {
        stomp.disconnect(() => {
    alert("채팅이 종료 되었습니다.");
  });
    } catch (err) {
    }
};

export const sendMessage = (roomId : number, message : string) => {
    const data = {
        content: message
    };
    stomp.send('/questions/' + roomId,
        {
            Authorization: "this is token"
        }
        ,JSON.stringify(data));
};
