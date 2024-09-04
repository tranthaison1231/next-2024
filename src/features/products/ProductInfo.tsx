interface Product {
  id: string;
  name: string;
}

const getProductInfo = async (): Promise<Product> => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject({
        id: "1",
        name: "Product 1",
      });
    }, 2000);
  });
};

export default async function ProductInfo() {
  const productInfo = await getProductInfo();
  return <div>Product Name{productInfo.name}</div>;
}
