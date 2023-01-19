import { putAdminSellerList } from '../../api/adminService';

type SellerConfirmCardProps = {
  seller: {
    ID: string;
    Name: string;
    PhoneNumber: string;
    sellerConfirm: boolean;
  };
};

const SellerConfirmCard = ({
  seller: { ID, Name, PhoneNumber, sellerConfirm },
}: SellerConfirmCardProps) => {
  const onConfirm = async () => {
    //승인 완료 판매자 post
    await putAdminSellerList();
  };

  return (
    <>
      <tr className='hover text-center'>
        <td>{ID}</td>
        <td>{Name}</td>
        <td>{PhoneNumber}</td>
        <td className='flex justify-center'>
          <button className='btn btn-primary px-8' onClick={onConfirm}>
            승인
          </button>
        </td>
      </tr>
    </>
  );
};

export default SellerConfirmCard;
