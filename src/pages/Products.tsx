import { useState } from 'react';
import ProductCard from '../components/ProductCard';

export type ProductType = {
  id: string;
  category: string;
  name: string;
  price: number;
  imagePath: string;
};

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([
    {
      id: '123',
      category: 'tent',
      name: 'tent',
      price: 12000,
      imagePath:
        'https://images.unsplash.com/photo-1478827536114-da961b7f86d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: '456',
      category: 'cook',
      name: 'cook',
      price: 12000,
      imagePath:
        'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    },
    {
      id: '789',
      category: 'accessory',
      name: 'accessory',
      price: 12000,
      imagePath:
        'https://images.unsplash.com/photo-1608005109415-c397b60f6027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80',
    },
  ]);

  return (
    <ul>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
