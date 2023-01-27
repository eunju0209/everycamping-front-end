import { useEffect, useState } from 'react';
import { getAdminSellerList } from '../api/adminService';
import SellerConfirmCard from '../components/Admin/SellerConfirmCard';

type SellerConfirmType = {
  id: string;
  name: string;
  phone: string;
  sellerConfirm: boolean;
};

const SellerConfirm = () => {
  const [sellerList, setSellerList] = useState<SellerConfirmType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await getAdminSellerList();
        setSellerList(result);
      } catch (error) {
        console.error(error);
        alert('오류가 발생 했습니다.');
      }
    })();
  }, []);

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
                <th>ID</th>
                <th>Name</th>
                <th>PhoneNumber</th>
                <th>Confirm</th>
              </tr>
            </thead>
            <tbody>
              {sellerList.map((seller) => (
                <SellerConfirmCard key={seller.id} seller={seller} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerConfirm;
