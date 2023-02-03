import { useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { getInfiniteItems } from '../../api/productsService';
import ProductCard from './ProductCard';
import { ProductType } from './ProductList';
import ProductsLoading from './ProductsLoading';

type ProductInfiniteListProprs = {
  category?: 'ALL' | 'TENT' | 'COOK' | 'ACCESSORY';
  filter: string;
};

export default function ProductInfiniteList({
  category,
  filter,
}: ProductInfiniteListProprs) {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(1);
  const [isLast, setIsLast] = useState(false);

  const [infiniteRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: !isLast,
    onLoadMore: () => {
      getInfiniteItems(category, filter, page) //
        .then((data) => {
          if (data.length < 1) {
            setIsLast(true);
          }
          setProducts((prev) => [...prev, ...data]);
          setPage((prev) => prev + 1);
        });
    },
    disabled: false,
    rootMargin: '0px 0px 0px 0px',
  });

  useEffect(() => {
    setIsLast(false);
    setPage(1);
    getInfiniteItems(category, filter, 0) //
      .then((data) => {
        setProducts(data);
      });
  }, [category, filter]);

  return (
    <>
      <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </ul>
      {products.length === 0 && (
        <div ref={infiniteRef} className='mt-10'>
          <ProductsLoading />
        </div>
      )}
    </>
  );
}
