import { putAdminSellerList } from '../../api/adminService';

type SellerConfirmCardProps = {
  seller: {
    id: string;
    name: string;
    phone: string;
    sellerConfirm: boolean;
  };
};

const SellerConfirmCard = ({
  seller: { id, name, phone, sellerConfirm },
}: SellerConfirmCardProps) => {
  const onConfirm = async () => {
    try {
      await putAdminSellerList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <tr className='hover text-center'>
        <td>{id}</td>
        <td>{name}</td>
        <td>{phone}</td>
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
