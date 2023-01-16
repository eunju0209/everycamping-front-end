import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserInfo } from '../../context/UserInfoProvider';
import AddressSearch from './AddressSearch';
import OrderFormItemCard from './OrderFormItemCard';

export type OrderInfo = {
  email: string;
  nickName: string;
  phoneNumber: string;
  address: string;
  items: object;
  request: string;
};

const OrderFormComp = () => {
  const { userInfo } = useUserInfo();
  const location = useLocation();
  const { totalPrice } = location.state;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    email: '',
    nickName: '',
    phoneNumber: '',
    address: '',
    items: [],
    request: '',
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
    <>
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
      <div className='form-control mt-3'>
        <label className='input-group'>
          <span className='justify-center min-w-74px whitespace-nowrap'>
            연락처
          </span>
          <input
            className='input input-bordered w-full text-lg bg-white focus:outline-none'
            name='phoneNumber'
            type='tel'
            placeholder={userInfo.phoneNumber}
            value={orderInfo.phoneNumber}
            required
            autoComplete='off'
            pattern='[0,1]{3}-[0-9]{4}-[0-9]{4}'
            onChange={(e) => onChange(e)}
          />
        </label>
      </div>
      <AddressSearch setOrderInfo={setOrderInfo} />
      <div className='flex flex-col mt-3'>
        <div className='form-control'>
          <label className='input-group'>
            <span className='justify-center min-w-74px whitespace-nowrap'>
              주문 정보
            </span>
            <div className='input input-bordered w-full bg-white focus:outline-none'>
              <OrderFormItemCard />
            </div>
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
              <td className='text-right'>{totalPrice.toLocaleString()}원</td>
            </tr>
            <tr>
              <th>배송비</th>
              <td className='text-right'>
                {totalPrice > 70000 ? '0' : '3,000'}원
              </td>
            </tr>
            <tr>
              <th>총 금액</th>
              <td className='text-right'>
                {' '}
                {totalPrice > 70000
                  ? totalPrice.toLocaleString()
                  : (totalPrice + 3000).toLocaleString()}
                원
              </td>
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
    </>
  );
};

export default OrderFormComp;
