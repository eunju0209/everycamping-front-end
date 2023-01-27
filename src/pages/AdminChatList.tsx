import AdminChatCard from '../components/Admin/AdminChatCard';

const AdminChatList = () => {
  return (
    <div>
      <div className='flex flex-col justify-center mx-auto max-w-cartDiv'>
        <h1 className='flex justify-center text-4xl'>1:1 문의 리스트</h1>
        <div className='mt-7'>{/* <AdminChatCard /> */}</div>
      </div>
    </div>
  );
};

export default AdminChatList;

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
