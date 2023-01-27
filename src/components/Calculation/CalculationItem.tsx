import CalculationModal from './CalculationModal';
import { CalculationType } from './CalculationTable';

type CalculationItemProps = {
  calculation: CalculationType;
};

export default function CalculationItem({ calculation }: CalculationItemProps) {
  const { id, amount, targetDate } = calculation;
  return (
    <tr>
      <th>{targetDate}</th>
      <td>{amount.toLocaleString()}원</td>
      <td>
        <label htmlFor='my-modal123' className='btn btn-sm btn-primary'>
          상세보기
        </label>
        <CalculationModal />
      </td>
    </tr>
  );
}
