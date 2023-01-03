import { TbTent } from 'react-icons/tb';

export default function Footer() {
  return (
    <footer className='flex flex-col items-center py-8 bg-white border-t border-base-100'>
      <h1 className='flex items-center text-2xl font-semibold text-gray-400 mb-2'>
        <TbTent className='text-3xl mr-0.5' />
        EveryCamping
      </h1>
      <p className='text-sm text-gray-400'>
        Copyright © 2022 - All right reserved
      </p>
    </footer>
  );
}
