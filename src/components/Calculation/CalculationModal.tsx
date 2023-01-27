export default function CalculationModal() {
  return (
    <>
      <input type='checkbox' id='my-modal123' className='modal-toggle' />
      <div className='modal text-left'>
        <div className='modal-box'>
          <p className='py-4'></p>
          <div className='modal-action'>
            <label htmlFor='my-modal123' className='btn'>
              확인
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
