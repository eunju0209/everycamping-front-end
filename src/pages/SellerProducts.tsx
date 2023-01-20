import ProductList from '../components/Product/ProductList';

export default function SellerProducts() {
  return (
    <>
      <ProductList seller={true} />
    </>
  );
}
