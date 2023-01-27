import { useParams } from 'react-router-dom';
import ProductList from '../components/Product/ProductList';

export default function Search() {
  const { keyword } = useParams();

  return <ProductList keyword={keyword} />;
}
