import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addNewProduct,
  deleteProduct,
  updateProduct,
} from '../api/productsService';
import { NewProductType } from '../components/Product/ProductForm';

export default function useProducts() {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation(
    ({
      product,
      image,
      detailImage,
    }: {
      product: NewProductType;
      image: File;
      detailImage: File;
    }) => addNewProduct(product, image, detailImage),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products']);
      },
    }
  );

  const updateProductMutation = useMutation(
    ({
      productId,
      updatedProduct,
      image,
      detailImage,
    }: {
      productId: string;
      updatedProduct: NewProductType;
      image?: File;
      detailImage?: File;
    }) => updateProduct(productId, updatedProduct, image, detailImage),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products']);
      },
    }
  );

  const deleteProductMutation = useMutation(
    ({ id }: { id: string }) => deleteProduct(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products']);
      },
    }
  );

  return { addProductMutation, updateProductMutation, deleteProductMutation };
}
