import { ProductType } from './../components/ProductList';
import axios from 'axios';

export async function getProducts(category?: string): Promise<ProductType[]> {
  const res = await axios.get(`/assets/data/${category}.json`);
  return res.data.items;
}
