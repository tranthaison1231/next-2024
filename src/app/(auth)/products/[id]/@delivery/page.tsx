import ProductDelivery from "@/features/products/ProductDelivery";

export default function DeliveryPage({ params }: { params: { id: string } }) {
  return <ProductDelivery productId={params.id} />;
}
