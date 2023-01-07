import { Dispatch } from 'react';

type ModalProps = {
  toggleModal: boolean;
  setToggleModal: Dispatch<React.SetStateAction<boolean>>;
  children: string;
};

const Modal = ({ toggleModal, setToggleModal, children }: ModalProps) => {
  const onClick = () => {
    setToggleModal(false);
  };
  return (
    <div className={`modal ${toggleModal ? 'visible opacity-100 ' : ''} `}>
      <div className='modal-box'>
        <p className='py-4'>{children}</p>
        <div className='modal-action'>
          <button className='btn pointer-events-auto' onClick={onClick}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
