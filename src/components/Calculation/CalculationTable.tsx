import { useQuery } from '@tanstack/react-query';
import { getCalculations } from '../../api/calculationService';
import CalculationItem from './CalculationItem';

export type CalculationType = {
  id: number;
  amount: number;
  targetDate: string;
};

export default function CalculationTable() {
  const { data: calculations } = useQuery(
    ['calculations'],
    () => getCalculations(),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full text-center'>
        <thead>
          <tr>
            <th>날짜</th>
            <th>금액</th>
            <th>상세보기</th>
          </tr>
        </thead>
        <tbody>
          {calculations &&
            calculations.map((calculation) => (
              <CalculationItem key={calculation.id} calculation={calculation} />
            ))}
        </tbody>
      </table>
    </div>
  );
}
