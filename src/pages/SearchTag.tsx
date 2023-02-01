import { useParams } from 'react-router-dom';
import ProductList from '../components/Product/ProductList';

export default function SearchTag() {
  const { tag } = useParams();
  return <ProductList tag={tag} />;
}
