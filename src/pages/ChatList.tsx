import ChatCard from '../components/Chatting/ChatCard';
import EmptyPage from '../components/EmptyPage';
import { getCookie, removeCookie, setCookie } from '../store/cookie';
import { queryGetChatList } from '../store/ReactQuery';
import { useUserInfo } from '../store/UserInfoProvider';
import { userTypeConvert } from '../util/userTypeConvert';

type ChatListItemType = {
  chatRoomId: number;
  requesterEmail: string;
  requesteeEmail: string;
  createdAt: string[];
};

const ChatList = () => {
  const { userInfo } = useUserInfo();

  const { isLoading, data } = queryGetChatList(
    getCookie('LoginType') === 'admin' ? 'admin' : userInfo.email,
    getCookie('LoginType') === 'admin'
      ? 'ADMIN'
      : userTypeConvert(getCookie('LoginType'))
  );

  const getChatListFunc = () => {
    if (isLoading) return;
    if (data) {
      return (
        <div className='mt-7'>
          {data.length !== 0 ? (
            data.map((item: ChatListItemType) => (
              <ChatCard
                key={item.chatRoomId}
                chatRoomId={item.chatRoomId}
                requesterEmail={item.requesterEmail}
                requesteeEmail={item.requesteeEmail}
                createdAt={item.createdAt}
              />
            ))
          ) : (
            <EmptyPage text='채팅방이 없습니다.' />
          )}
        </div>
      );
    }
  };

  return (
    <div>
      <div className='flex flex-col justify-center mx-auto max-w-chatList'>
        <h1 className='flex justify-center text-4xl'>1:1 문의 리스트</h1>
        {getChatListFunc()}
      </div>
    </div>
  );
};

export default ChatList;

export const ChatLeft = ({ message }: { message: string }) => {
  return (
    <div className='chat chat-start'>
      <div className='chat-bubble'>{message}</div>
    </div>
  );
};

export const ChatRight = ({ message }: { message: string }) => {
  return (
    <div className='chat chat-end'>
      <div className='chat-bubble'>{message}</div>
    </div>
  );
};
