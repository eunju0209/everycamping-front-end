import { CalculationDetailType } from '../components/Calculation/CalculationDetailTable';
import { CalculationType } from '../components/Calculation/CalculationTable';
import { authAxios } from './authAxios';

export async function getCalculations(): Promise<CalculationType[]> {
  const res = await authAxios.get(`/api/settlements`);
  return res.data.content;
}

export async function getCalculationDetail(
  settlementId: string
): Promise<CalculationDetailType[]> {
  const res = await authAxios.get(`/api/settlements/${settlementId}`);
  return res.data.content;
}
