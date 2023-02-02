import { useParams } from 'react-router-dom';
import ProductList from '../components/Product/ProductList';

export default function Search() {
  const { category, keyword } = useParams();

  return <ProductList category={category} keyword={keyword} />;
}
