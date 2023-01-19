import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { postOrders } from '../../api/orderService';
import { cartContentType } from '../../pages/Cart';
import { useUserInfo } from '../../store/UserInfoProvider';
import AddressSearch from './AddressSearch';
import OrderFormItemCard from './OrderFormItemCard';

export type OrderInfo = {
  email: string;
  nickName: string;
  phoneNumber: string;
  address: string;
  request: string;
};

const OrderFormComp = () => {
  const { userInfo } = useUserInfo();
  const location = useLocation();
  const { totalPrice, orderItems } = location.state;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const orderDetailRef = useRef<HTMLDivElement>(null);
  const [orderInfo, setOrderInfo] = useState<OrderInfo>({
    email: '',
    nickName: '',
    phoneNumber: '',
    address: '',
    request: '',
  });
  const deliveryPrice = 3000;

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
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  };

  const formSubmit = async () => {
    console.log(orderInfo, orderItems, totalPrice);
    await postOrders({
      ...orderInfo,
      orderItems,
      totalPrice,
    });
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
            <div
              className='input input-bordered w-full bg-white h-fit px-3 pb-3 focus:outline-none'
              ref={orderDetailRef}
            >
              {orderItems.map((item: cartContentType) => (
                <OrderFormItemCard
                  key={item.productId}
                  title={item.name}
                  count={item.quantity}
                  price={item.price}
                />
              ))}
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
              className='input input-bordered pt-2 w-full text-lg bg-white focus:outline-none h-fit'
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
                {totalPrice > 70000 ? '0' : deliveryPrice}원
              </td>
            </tr>
            <tr>
              <th>총 금액</th>
              <td className='text-right'>
                {totalPrice > 70000
                  ? totalPrice.toLocaleString()
                  : (totalPrice + deliveryPrice).toLocaleString()}
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
