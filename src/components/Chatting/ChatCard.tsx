import { useState } from 'react';
import ChatCardChatting from './ChatCardChatting';

type ChatCardType = {
  title: string;
};

const ChatCard = ({ title }: ChatCardType) => {
  const [popDetail, setPopDetail] = useState(false);
  const popUpDetail = () => {
    setPopDetail(true);
  };
  return (
    <div className='flex rounded bg-white mt-3 p-2'>
      <div
        className='flex justify-between w-full p-2 cursor-pointer'
        onClick={popUpDetail}
      >
        <div className='flex flex-col justify-between w-full p-1'>{title}</div>
      </div>
      <ChatCardChatting popDetail={popDetail} setPopDetail={setPopDetail} />
    </div>
  );
};

export default ChatCard;
