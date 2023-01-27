import { useNavigate } from 'react-router-dom';
import { CalculationType } from './CalculationTable';

type CalculationItemProps = {
  calculation: CalculationType;
};

export default function CalculationItem({ calculation }: CalculationItemProps) {
  const navigate = useNavigate();
  const { id, amount, targetDate } = calculation;
  return (
    <tr>
      <td>{targetDate}</td>
      <td>{amount.toLocaleString()}원</td>
      <td>
        <button
          className='btn btn-sm btn-primary'
          onClick={() => navigate(`/mypage/seller/calculation/${id}`)}
        >
          상세보기
        </button>
      </td>
    </tr>
  );
}
