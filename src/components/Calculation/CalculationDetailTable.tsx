import { useQuery } from '@tanstack/react-query';
import { getCalculationDetail } from '../../api/calculationService';
import CalculationDetailItem from './CalculationDetailItem';

type CalculationDetailTableProps = {
  id: string;
};

export type CalculationDetailType = {
  productId: number;
  productNameSnapshot: string;
  quantity: number;
  amount: number;
  customerId: number;
  customerEmail: string;
  customerNickName: string;
  orderedAt: string;
  confirmedAt: string;
};

export default function CalculationDetailTable({
  id,
}: CalculationDetailTableProps) {
  const { data: calculationDetails } = useQuery(
    ['calculationDetails', id],
    () => getCalculationDetail(id),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full text-center'>
        <thead>
          <tr>
            <th>제품명</th>
            <th>수량</th>
            <th>금액</th>
            <th>고객 이메일</th>
            <th>고객 닉네임</th>
            <th>주문날짜</th>
            <th>확인날짜</th>
          </tr>
        </thead>
        <tbody>
          {calculationDetails &&
            calculationDetails.map((calculationDetail, idx) => (
              <CalculationDetailItem
                key={idx}
                calculationDetail={calculationDetail}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}
