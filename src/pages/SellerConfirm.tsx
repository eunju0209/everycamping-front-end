import { getAdminSellerList } from '../api/adminService';
import SellerConfirmCard from '../components/Admin/SellerConfirmCard';

const SellerConfirm = () => {
  // 승인 대기 판매자 리스트 받아오기 api
  // getAdminSellerList()

  const sellerList = async () => {
    const result = await getAdminSellerList();
    return result;
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
                <th>ID</th>
                <th>Name</th>
                <th>PhoneNumber</th>
                <th>Confirm</th>
              </tr>
            </thead>
            <tbody>
              {sellerList.map((seller) => (
                <SellerConfirmCard key={seller.ID} seller={seller} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SellerConfirm;
