import SockJs from 'sockjs-client'
import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRef } from 'react';
import SockJS from 'sockjs-client';
import { storedToken } from '../store/accessToken';



// export const connectHandler = () => {
//   client.current = Stomp.over(() => {
//     const sock = new SockJS("http://localhost:8080/{백에서 설정한 end point}")
//     return sock;
//   });
//   client.current.connect(
//     {
//       // 여기에서 유효성 검증을 위해 header를 넣어줄 수 있음.
//       // ex) 
// 	  Authorization: storedToken.Token
//     },
//     () => {
//       // callback 함수 설정, 대부분 여기에 sub 함수 씀
//       client.current?.subscribe(
//      	`/백엔드와 협의한 api주소/{구독하고 싶은 방의 id}`,
//         (message) => {
//           setMessage(JSON.parse(message.body));
//         },
//         {
//           // 여기에도 유효성 검증을 위한 header 넣어 줄 수 있음
//         }
//       );
//     }
//   );
// }


const sock = new SockJs('/api/websocket');

const stomp = Stomp.over(sock);

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
    console.log(data)
  stomp.send("/questions/1",
    {}
    // token
    ,JSON.stringify(data));
  };
//웹소켓 데이터 전송 부분