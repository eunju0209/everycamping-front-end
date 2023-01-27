import { useParams } from 'react-router-dom';
import CalculationDetailTable from '../components/Calculation/CalculationDetailTable';

type CalculationDetailParams = {
  id: string;
};

export default function CalculationDetail() {
  const { id } = useParams() as CalculationDetailParams;
  return (
    <>
      <CalculationDetailTable id={id} />
    </>
  );
}
