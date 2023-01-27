import { CalculationDetailType } from './CalculationDetailTable';

type CalculationDetailItemProps = {
  calculationDetail: CalculationDetailType;
};

export default function CalculationDetailItem({
  calculationDetail,
}: CalculationDetailItemProps) {
  const {
    productNameSnapshot,
    quantity,
    amount,
    customerEmail,
    customerNickName,
    orderedAt,
    confirmedAt,
  } = calculationDetail;
  return (
    <tr>
      <td>{productNameSnapshot}</td>
      <td>{quantity}</td>
      <td>{amount.toLocaleString()}원</td>
      <td>{customerEmail}</td>
      <td>{customerNickName}</td>
      <td>{orderedAt}</td>
      <td>{confirmedAt}</td>
    </tr>
  );
}
