import { useNavigate } from 'react-router-dom';

export default function AddCartModal() {
  const navigate = useNavigate();
  return (
    <>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>장바구니에 추가되었습니다.</h3>
          <div className='modal-action'>
            <label
              htmlFor='my-modal'
              className='btn btn-primary'
              onClick={() => navigate('/cart')}
            >
              장바구니 바로가기
            </label>
            <label htmlFor='my-modal' className='btn'>
              확인
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
