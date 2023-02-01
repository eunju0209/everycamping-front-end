import { CalculationDetailType } from '../components/Calculation/CalculationDetailTable';
import { CalculationType } from '../components/Calculation/CalculationTable';
import { authAxios } from './authAxios';
import { PROXY } from './productsService';

export async function getCalculations(): Promise<CalculationType[]> {
  const res = await authAxios.get(`${PROXY}/settlements`);
  return res.data.content;
}

export async function getCalculationDetail(
  settlementId: string
): Promise<CalculationDetailType[]> {
  const res = await authAxios.get(`${PROXY}/settlements/${settlementId}`);
  return res.data.content;
}
