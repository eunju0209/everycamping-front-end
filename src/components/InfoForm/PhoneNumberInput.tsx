import { useEffect, useState } from 'react';
import { OrderInfo } from '../../pages/OrderForm';

type PhoneNumberInputProps = {
  userPhoneNumber: string;
  setInfo: React.Dispatch<React.SetStateAction<OrderInfo>>;
};

const PhoneNumberInput = ({
  userPhoneNumber,
  setInfo,
}: PhoneNumberInputProps) => {
  const [value, setValue] = useState('');
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const submitPhoneNumber = () => {
    setInfo((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  useEffect(() => {
    setValue(userPhoneNumber);
  }, []);
  return (
    <div className='form-control mt-3'>
      <label className='input-group'>
        <span className='justify-center min-w-74px whitespace-nowrap'>
          연락처
        </span>
        <input
          className='input input-bordered w-full text-lg bg-white focus:outline-none'
          name='phoneNumber'
          type='tel'
          placeholder={userPhoneNumber}
          value={value}
          required
          autoComplete='off'
          pattern='[0,1]{3}-[0-9]{4}-[0-9]{4}'
          onChange={(e) => onChange(e)}
          onBlur={submitPhoneNumber}
        />
      </label>
    </div>
  );
};

export default PhoneNumberInput;
