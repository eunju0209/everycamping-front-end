import SockJs from 'sockjs-client'
import StompJs from 'stompjs'
import { CHAT_URL } from '../constant/URL';


const sock = new SockJs('/api//websocket');

const stomp = StompJs.over(sock);

export const stompConnect = () => {
    try {
      // stomp.debug = null;
      //웹소켓 연결시 stomp에서 자동으로 connect이 되었다는것을 
      //console에 보여주는데 그것을 감추기 위한 debug
      
      stomp.connect(
        {}
        // token
        , () => {
        stomp.subscribe(
          '/api/topic/questions/1',
          (data: { body: string; }) => {
            const newMessage = JSON.parse(data.body);
            //데이터 파싱
          },
          // token
        );
      });
    } catch (err) {
      
    }
  };

export const stompDisConnect = () => {
    try {
      // stomp.debug = null;
      stomp.disconnect(() => {
        stomp.unsubscribe("sub-0");
      }
        // , token
      );
    } catch (err) {
      
    }
  };

export const SendMessage = (message: string) => {
    // stomp.debug = null;
    const data = {
      type: "TALK",
      // roomId: roomId,
      // sender: sender_nick,
      message: message,
      // createdAt: now,
    };
  stomp.send("/questions/1",
    {}
    // token
    ,JSON.stringify(data));
  };
//웹소켓 데이터 전송 부분