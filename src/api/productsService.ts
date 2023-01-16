import { ProductType } from './../components/ProductList';
import axios from 'axios';
import { ProductDetailType } from '../components/ProductInfo';
import { ReviewType } from '../components/ReviewList';

export async function getProducts(
  category?: string,
  filter?: string,
  keyword?: string
): Promise<ProductType[]> {
  return keyword ? search(keyword) : getItems(category, filter);
}

export async function getProductDetail(id: string): Promise<ProductDetailType> {
  const res = await axios.get('/assets/data/detail.json');
  return res.data.items[0];
}

export async function getReviews(productId: string): Promise<ReviewType[]> {
  const res = await axios.get('/assets/data/review.json');
  return res.data.items;
}

async function search(keyword: string): Promise<ProductType[]> {
  const res = await axios.get('/assets/data/search.json');
  return res.data.items;
}

async function getItems(
  category?: string,
  filter?: string
): Promise<ProductType[]> {
  const res = await axios.get(
    `/assets/data/${filter ? filter : category}.json`
  );
  return res.data.items;
}
