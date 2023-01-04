import { ProductType } from '../pages/Products';

type ProductCardProps = {
  product: ProductType;
};

export default function ProductCard({ product }: ProductCardProps) {
  return <div>{product.name}</div>;
}
