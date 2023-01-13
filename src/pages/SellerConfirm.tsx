import SellerConfirmCard from '../components/Seller/SellerConfirmCard';

const SellerConfirm = () => {
  // 승인 대기 판매자 리스트 받아오기 api

  const sellerList = [
    {
      ID: 'cow_boy27@naver.com',
      Name: '박재형',
      PhoneNumber: '010-3558-3752',
      sellerConfirm: false,
    },
  ];

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='flex justify-center text-4xl'>
        <p>판매자 승인</p>
      </div>
      <div className='mt-10'>
        <div className='overflow-x-auto '>
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
