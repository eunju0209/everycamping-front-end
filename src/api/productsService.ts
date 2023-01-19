import { ProductType } from './../components/ProductList';
import axios from 'axios';
import { ProductDetailType } from '../components/ProductInfo';
import { ReviewType } from '../components/ReviewList';
import { NewProductType } from '../components/ProductForm';
import { NewReviewType } from '../components/ReviewForm';
import { authAxios } from './authAxios';

const token = '';

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

export async function addNewProduct(
  product: NewProductType,
  image: File,
  detailImage: File
) {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(product)], {
    type: 'application/json',
  });
  formData.append('form', blob);
  formData.append('image', image);
  formData.append('detailImage', detailImage);

  return axios.post('api/manage/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
  });
}

export async function getReviews(productId: string): Promise<ReviewType[]> {
  const res = await axios.get('/assets/data/review.json');
  return res.data.items;
}

export async function addNewReview(review: NewReviewType, image: File) {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(review)], {
    type: 'application/json',
  });
  formData.append('form', blob);
  formData.append('image', image);
  return axios.post('/api/reviews', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: token,
    },
  });
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
