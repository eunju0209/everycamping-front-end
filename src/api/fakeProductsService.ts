import axios from 'axios';
import { ProductType } from '../pages/Products';

export default class FakeProductsService {
  async getProducts(category?: string): Promise<ProductType[]> {
    const res = await axios.get(`/assets/data/${category}.json`);
    return res.data.items;
  }
}
