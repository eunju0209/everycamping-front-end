import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putAdminSellerList } from '../../api/adminService';
import { AdminSellerCardType } from '../../pages/SellerConfirm';

type SellerConfirmCardProps = {
  seller: AdminSellerCardType;
};

const SellerConfirmCard = ({
  seller: { id, email, nickName, phone, registeredAt },
}: SellerConfirmCardProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(putAdminSellerList, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['@AdminSellerList'] });
    },
  });
  const onConfirm = async () => {
    mutate(id);
  };

  return (
    <tr className='hover text-center'>
      <td>{registeredAt}</td>
      <td>{email}</td>
      <td>{nickName}</td>
      <td>{phone}</td>
      <td className='flex justify-center'>
        <button className='btn btn-primary px-8' onClick={onConfirm}>
          승인
        </button>
      </td>
    </tr>
  );
};

export default SellerConfirmCard;
