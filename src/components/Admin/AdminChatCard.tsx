import { useState } from 'react';
import AdminChatCardChatting from './AdminChatCardChatting';

const AdminChatCard = () => {
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
        <div className='flex flex-col justify-between w-full p-1'>
          채팅 리스트 1
        </div>
      </div>
      <AdminChatCardChatting
        popDetail={popDetail}
        setPopDetail={setPopDetail}
      />
    </div>
  );
};

export default AdminChatCard;
