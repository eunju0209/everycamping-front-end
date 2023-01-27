import SellerConfirmCard from '../components/Admin/SellerConfirmCard';
import { queryGetAdminSellerList } from '../store/ReactQuery';

export type AdminSellerCardType = {
  id: number;
  email: string;
  nickName: string;
  phone: string;
  registeredAt: string;
};

const SellerConfirm = () => {
  const result: AdminSellerCardType[] = queryGetAdminSellerList();

  const getAdminSellerListFunc = () => {
    if (result) {
      return (
        <tbody>
          {result.map((items: AdminSellerCardType) => (
            <SellerConfirmCard key={items.id} seller={items} />
          ))}
        </tbody>
      );
    }
  };

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex justify-center text-4xl'>
        <p>판매자 승인</p>
      </div>
      <div className='mt-10'>
        <div className='overflow-x-auto'>
          <table className='table w-full'>
            <thead>
              <tr className='text-center'>
                <th>Date</th>
                <th>ID</th>
                <th>Name</th>
                <th>PhoneNumber</th>
                <th>Confirm</th>
              </tr>
            </thead>
            {getAdminSellerListFunc()}
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerConfirm;
