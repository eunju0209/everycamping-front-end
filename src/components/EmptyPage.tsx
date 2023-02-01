type EmptyPageType = {
  text: string;
};

const EmptyPage = ({ text }: EmptyPageType) => {
  return (
    <div className='flex justify-center my-40 text-2xl text-gray-400'>
      {text}
    </div>
  );
};

export default EmptyPage;
