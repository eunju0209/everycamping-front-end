import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { getUserOrderLIst } from '../../api/orderService';
import CalendarApp from '../../components/Calendar';
import UserOrderCard from '../../components/OrderList/UserOrderCard';

export type UserOrderType = {
  id: number;
  representProductName: string;
  orderProductCount: number;
  totalAmount: number;
  createdAt: string;
};

export default function UserOrderList() {
  const [orderList, setOrderList] = useState<UserOrderType[]>([]);
  const [sorting, setSorting] = useState({
    type: 'createdAt',
    sort: 'DESC',
  });
  const [searchDate, setSearchDate] = useState({
    startDate: format(new Date(), 'yy-MM-dd'),
    endDate: format(new Date(), 'yy-MM-dd'),
  });

  useEffect(() => {
    (async () => {
      try {
        const result = await getUserOrderLIst(sorting);
        setOrderList(result);
      } catch (error) {
        console.log(error);
        alert('오류가 생겼습니다.');
      }
    })();
  }, [sorting]);

  const handleSorting = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;
    console.log(value);

    value === 'DESC'
      ? setSorting((prev) => ({
          ...prev,
          sort: 'DESC',
        }))
      : setSorting((prev) => ({
          ...prev,
          sort: 'ASC',
        }));
  };

  const handleSearchDate = async () => {
    const result = await getUserOrderLIst(sorting, searchDate);
    setOrderList(result);
  };

  return (
    <div>
      <div className='flex flex-col justify-center mx-auto max-w-orderList'>
        <h1 className='flex justify-center text-4xl'>주문내역</h1>

        <div className='mt-7'>
          <div className='flex items-center'>
            <div className='dropdown dropdown-bottom'>
              <select
                className='bg-inherit rounded'
                onChange={(e) => handleSorting(e)}
              >
                <option value='DESC'>최신순</option>
                <option value='ASC'>오래된순</option>
              </select>
            </div>
            <div className='mx-2'>
              <CalendarApp type='startDate' setSearchDate={setSearchDate} />
            </div>
            <span>~</span>
            <div className='mx-2'>
              <CalendarApp type='endDate' setSearchDate={setSearchDate} />
            </div>
            <button
              className='btn btn-xs btn-primary'
              onClick={handleSearchDate}
            >
              검색
            </button>
          </div>
          {orderList.map((list: UserOrderType) => {
            return <UserOrderCard key={list.id} list={list} />;
          })}
        </div>
      </div>
    </div>
  );
}
