interface ProductDelivery {
  id: string;
  address: string;
}

const getProductDelivery = async (): Promise<ProductDelivery> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "1",
        address: "Address 1",
      });
    }, 1000);
  });
};

export default async function ProductDelivery() {
  const productDelivery = await getProductDelivery();
  return <div>{productDelivery.address}</div>;
}
