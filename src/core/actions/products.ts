'use server';

import { unstable_cache } from 'next/cache';

export const getProducts = unstable_cache(
  async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', name: 'Product 1' },
          { id: '2', name: 'Product 2' },
          { id: '3', name: 'Product 3' }
        ]);
      }, 3000);
    });
  },
  ['products'],
  { revalidate: 60, tags: ['products'] }
);

interface ProductDelivery {
  id: string;
  address: string;
}

export const getProductDelivery = async (
  productId: string
): Promise<ProductDelivery> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: productId,
        address: `Address for product ${productId}`
      });
    }, 4000);
  });
};
