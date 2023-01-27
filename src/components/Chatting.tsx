import { useEffect, useRef, useState } from 'react';
import { BsChatRight } from 'react-icons/bs';
import {
  getRoomId,
  sendMessage,
  stompConnect,
  stompDisConnect,
} from '../api/chat';
import { getCookie } from '../store/cookie';
import { userTypeConvert } from '../util/userTypeConvert';

export type messageDataType = {
  content: string;
  userType: string;
};

const Chatting = () => {
  const [message, setMassage] = useState<messageDataType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState<string>('');
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const popChat = async () => {
    try {
      if (chatRef.current) {
        if (
          chatRef.current.style.display === 'none' ||
          !chatRef.current.style.display
        ) {
          chatRef.current.style.display = 'flex';

          await getRoomId().then((roomId) => {
            stompConnect(roomId, setMassage);
            setRoomId(roomId);
          });
        } else if (chatRef.current.style.display === 'flex') {
          chatRef.current.style.display = 'none';

          stompDisConnect();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const messageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(roomId, newMessage, userTypeConvert(getCookie('LoginType')));
    setNewMessage('');
  };

  const scrollToBottom = () => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <div className='fixed z-10 right-16 bottom-16'>
      <div
        className='flex flex-col justify-end w-96 h-600px bg-stone-50/90 rounded-lg border border-gray-300 hidden '
        ref={chatRef}
      >
        <div className='px-3 py-5 h-600px overflow-auto' ref={messageBoxRef}>
          {message.map((message, idx) =>
            message.userType === userTypeConvert(getCookie('LoginType')) ? (
              <ChatRight key={idx} message={message.content} />
            ) : (
              <ChatLeft key={idx} message={message.content} />
            )
          )}
        </div>
        <form className='form-control' onSubmit={messageSubmit}>
          <label className='input-group'>
            <input
              type='text'
              placeholder='메시지를 입력하세요...'
              className='input input-bordered w-full focus:outline-none'
              id='name'
              value={newMessage}
              onChange={(e) => handleMessageChange(e)}
              autoComplete='off'
            />
            <span>
              <button type='submit'>send</button>
            </span>
          </label>
        </form>
      </div>
      <BsChatRight
        onClick={popChat}
        className='cursor-pointer fixed z-50 right-10 bottom-10 scale-150'
      />
    </div>
  );
};

export default Chatting;

const ChatLeft = ({ message }: { message: string }) => {
  return (
    <div className='chat chat-start'>
      <div className='chat-bubble'>{message}</div>
    </div>
  );
};

const ChatRight = ({ message }: { message: string }) => {
  return (
    <div className='chat chat-end'>
      <div className='chat-bubble'>{message}</div>
    </div>
  );
};
