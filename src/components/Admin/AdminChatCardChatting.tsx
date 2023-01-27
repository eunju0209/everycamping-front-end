import { ChatLeft, ChatRight } from '../../pages/AdminChatList';

type AdminChatCardChattingProps = {
  popDetail: boolean;
  setPopDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminChatCardChatting = ({
  popDetail,
  setPopDetail,
}: AdminChatCardChattingProps) => {
  const popUpDetail = () => {
    setPopDetail(false);
  };
  return (
    <div
      className={`modal ${
        popDetail ? 'visible opacity-100 pointer-events-auto' : ''
      } `}
    >
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
      </div>
    </div>
  );
};

export default AdminChatCardChatting;
