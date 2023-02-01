import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { deleteChatList } from '../../api/chat';
import { getCookie } from '../../store/cookie';
import { useUserInfo } from '../../store/UserInfoProvider';
import ChatCardChatting from './ChatCardChatting';

type ChatCardType = {
  chatRoomId: number;
  requesterEmail: string;
  requesteeEmail: string;
  createdAt: string;
};

const ChatCard = ({
  requesterEmail,
  requesteeEmail,
  chatRoomId,
  createdAt,
}: ChatCardType) => {
  const [popDetail, setPopDetail] = useState(false);
  const { userInfo } = useUserInfo();
  const queryClient = useQueryClient();

  const deleteMutate = useMutation(deleteChatList, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['@ChatList'] });
    },
  });

  const popUpDetail = () => {
    setPopDetail(true);
  };
  const deletechat = () => {
    deleteMutate.mutate(chatRoomId);
  };

  return (
    <div className='flex rounded bg-white mt-3 p-2'>
      <div
        className='flex justify-between w-full p-2 cursor-pointer'
        onClick={popUpDetail}
      >
        <div className='flex flex-col justify-between w-full p-1'>
          <div>{createdAt}</div>
          <div>
            {getCookie('LoginType') === 'user'
              ? `To : ${requesteeEmail}`
              : `From : ${requesterEmail}`}
          </div>
        </div>
      </div>
      {userInfo.type === 'user' ? (
        <button className='btn btn-primary' onClick={deletechat}>
          채팅 종료
        </button>
      ) : (
        ''
      )}
      <ChatCardChatting
        popDetail={popDetail}
        setPopDetail={setPopDetail}
        chatRoomId={chatRoomId}
      />
    </div>
  );
};

export default ChatCard;
