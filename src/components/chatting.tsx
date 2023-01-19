import { useEffect, useRef, useState } from 'react';
import { BsChatRight } from 'react-icons/bs';
import { SendMessage } from '../api/chat';

const Chat = () => {
  const [message, setMassage] = useState('');
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const [chatedMessage, setChatedMessage] = useState<string[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);

  const popChat = () => {
    if (chatRef.current) {
      chatRef.current.style.display === 'flex'
        ? (chatRef.current.style.display = 'none')
        : (chatRef.current.style.display = 'flex');
    }
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMassage(event.target.value);
  };

  const messageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChatedMessage((prev) => [...prev, message]);
    SendMessage(message);
    console.log(event);
    setMassage('');
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
          <ChatLeft />
          {chatedMessage.map((message, idx) => (
            <ChatRight key={idx} message={message} />
          ))}
        </div>
        <form className='form-control' onSubmit={messageSubmit}>
          <label className='input-group'>
            <input
              type='text'
              placeholder='메시지를 입력하세요...'
              className='input input-bordered w-full focus:outline-none'
              id='name'
              value={message}
              onChange={(e) => handleContentChange(e)}
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

export default Chat;

const ChatLeft = () => {
  return (
    <div className='chat chat-start'>
      <div className='chat-bubble'>비쌉니다 4달라에 주세요</div>
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
