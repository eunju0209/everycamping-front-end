import { useEffect, useRef, useState } from 'react';
import {
  getRoomId,
  sendMessage,
  stompConnect,
  stompDisConnect,
} from '../../api/chat';
import { ChatLeft, ChatRight } from '../../pages/ChatList';
import { getCookie } from '../../store/cookie';
import { userTypeConvert } from '../../util/userTypeConvert';

type ChatCardChattingProps = {
  popDetail: boolean;
  setPopDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

export type messageDataType = {
  content: string;
  userType: string;
};

const ChatCardChatting = ({
  popDetail,
  setPopDetail,
}: ChatCardChattingProps) => {
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [message, setMassage] = useState<messageDataType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState<string>('');

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

  useEffect(() => {
    if (popDetail) {
      getRoomId().then((roomId) => {
        stompConnect(roomId, setMassage);
        setRoomId(roomId);
      });
    }
  }, [popDetail]);

  const popUpDetail = () => {
    setPopDetail(false);
    stompDisConnect();
  };

  return (
    <div
      className={`modal ${
        popDetail ? 'visible opacity-100 pointer-events-auto' : ''
      } `}
    >
      <div className='flex flex-col justify-end w-96 h-600px bg-white rounded-lg border border-gray-300'>
        <div className='flex justify-end'>
          <div
            className='w-4 h-4 bg-gray-300 rounded-full mt-1 mr-1 cursor-pointer'
            onClick={popUpDetail}
          ></div>
        </div>
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
    </div>
  );
};

export default ChatCardChatting;
