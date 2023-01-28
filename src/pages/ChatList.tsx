import ChatCard from '../components/Chatting/ChatCard';

const ChatList = () => {
  const chatList = [
    {
      id: 1,
      title: '채팅 리스트1',
    },
    {
      id: 2,
      title: '채팅 리스트2',
    },
  ];
  return (
    <div>
      <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
        <h1 className='flex justify-center text-4xl'>1:1 문의 리스트</h1>
        <div className='mt-7'>
          {chatList.map((list) => (
            <ChatCard key={list.id} title={list.title} />
          ))}
        </div>
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
