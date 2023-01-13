import { useEffect, useRef, useState } from 'react';
import AddressSearch from '../components/AddressSearch';
import PhoneNumberInput from '../components/InfoForm/PhoneNumberInput';
import { useUserInfo } from '../context/UserInfoProvider';

export type OrderInfo = {
  email: string;
  nickName: string;
  phoneNumber: string;
  address: string;
  items: object;
  request: string;
  price: {
    itemsPrice: string;
    deliveryPrice: string;
    totalPrice: string;
  };
};

export default function OrderForm() {
  const { userInfo } = useUserInfo();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    email: '',
    nickName: '',
    phoneNumber: '',
    address: '',
    items: [],
    request: '',
    price: {
      itemsPrice: '0',
      deliveryPrice: '3,000',
      totalPrice: '0',
    },
  });

  useEffect(() => {
    setOrderInfo((prev) => ({
      ...prev,
      ...userInfo,
    }));
  }, []);

  const onChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;

    setOrderInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResizeHeight = () => {
    console.log('a');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  };

  const formSubmit = () => {
    console.log(orderInfo);
  };

  return (
    <div className='flex flex-col justify-center mx-auto w-96'>
      <p className='flex justify-center text-4xl'>주문서</p>
      <div className='flex flex-col mt-10'>
        <div className='form-control'>
          <label className='input-group'>
            <span className='justify-center min-w-74px whitespace-nowrap'>
              이름
            </span>
            <input
              className='input input-bordered w-full text-lg bg-white focus:outline-none'
              type='text'
              name='nickName'
              placeholder={userInfo.nickName}
              onChange={(e) => onChange(e)}
              value={orderInfo.nickName}
              required
              autoComplete='off'
            />
          </label>
        </div>
      </div>
      <PhoneNumberInput
        userPhoneNumber={userInfo.phoneNumber}
        setInfo={setOrderInfo}
      />
      <AddressSearch setOrderInfo={setOrderInfo} />
      <div className='flex flex-col mt-3'>
        <div className='form-control'>
          <label className='input-group'>
            <span className='justify-center min-w-74px whitespace-nowrap'>
              주문 정보
            </span>
            <div className='input input-bordered w-full text-lg bg-white focus:outline-none'></div>
          </label>
        </div>
      </div>
      <div className='flex flex-col mt-3'>
        <div className='form-control'>
          <label className='input-group'>
            <span className='justify-center min-w-74px whitespace-nowrap'>
              요청 사항
            </span>
            <textarea
              className='input input-bordered pt-2 w-full text-lg bg-white focus:outline-none'
              name='request'
              value={orderInfo.request}
              ref={textareaRef}
              onChange={(e) => {
                onChange(e);
                handleResizeHeight();
              }}
            />
          </label>
        </div>
      </div>
      <div className='overflow-x-auto'>
        <table className='table w-full'>
          <tbody>
            <tr>
              <th>금액</th>
              <td className='text-right'>{orderInfo.price.itemsPrice}</td>
            </tr>
            <tr>
              <th>배송비</th>
              <td className='text-right'>{orderInfo.price.deliveryPrice}</td>
            </tr>
            <tr>
              <th>총 금액</th>
              <td className='text-right'>{orderInfo.price.totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='flex justify-center mt-10'>
        <button
          className='w-24 p-2 btn btn-primary'
          type='button'
          onClick={formSubmit}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
