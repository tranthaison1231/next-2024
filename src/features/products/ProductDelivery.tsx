import { getProductDelivery } from '@/core/actions/products';
import Product from './Product';

interface ProductDeliveryProps {
  productId: string;
}

export default async function ProductDelivery({
  productId
}: ProductDeliveryProps) {
  const productDelivery = await getProductDelivery(productId);
  return (
    <div>
      {productDelivery.address}
      <Product />
    </div>
  );
}
