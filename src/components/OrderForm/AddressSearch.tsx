import { useState } from 'react';
import DaumPostcode, { Address } from 'react-daum-postcode';
import { OrderInfo } from './OrderFormComp';

type AddressSearchPops = {
  setOrderInfo: React.Dispatch<React.SetStateAction<OrderInfo>>;
};

const AddressSearch = ({ setOrderInfo }: AddressSearchPops) => {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = useState({
    address: '',
    detailAddress: '',
  });

  const handle = {
    clickButton: () => {
      setOpenPostcode((prev) => !prev);
    },

    selectAddress: (data: Address) => {
      setSelectedAddress((prev) => ({
        ...prev,
        address: data.address,
      }));
      setOpenPostcode(false);
    },

    detailAddress: (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedAddress((prev) => ({
        ...prev,
        detailAddress: event.target.value,
      }));
    },

    submitAddress: () => {
      setOrderInfo((prev) => ({
        ...prev,
        address: selectedAddress.address + ' ' + selectedAddress.detailAddress,
      }));
    },
  };

  return (
    <>
      <div className='form-control mt-3 relative'>
        <label className='input-group'>
          <span className='justify-center min-w-74px whitespace-nowrap'>
            주소
          </span>
          <input
            className='input input-bordered w-full text-lg focus:outline-none'
            type='text'
            name='address'
            placeholder='주소'
            value={selectedAddress.address}
            disabled
            autoComplete='off'
          />
        </label>
        <button
          className='absolute left-full w-24 ml-2 p-2 btn btn-primary'
          onClick={handle.clickButton}
        >
          주소검색
        </button>
        {openPostcode && (
          <div className='absolute right-0 z-50'>
            <DaumPostcode
              onComplete={handle.selectAddress}
              style={{ minWidth: 310 }}
              autoClose={false}
            />
          </div>
        )}
      </div>
      <div className='flex justify-end mt-3'>
        <input
          className='input input-bordered max-w-310px w-full text-lg bg-white focus:outline-none'
          placeholder='상세주소 입력'
          onChange={(event) => handle.detailAddress(event)}
          onBlur={handle.submitAddress}
          value={selectedAddress.detailAddress}
        />
      </div>
    </>
  );
};

export default AddressSearch;
