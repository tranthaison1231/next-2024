import { Metadata } from "next";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
}

const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: "1", name: "Product 1" },
        { id: "2", name: "Product 2" },
        { id: "3", name: "Product 3" },
      ]);
    }, 1000);
  });
};

export default async function Products() {
  const products = await getProducts();
  return (
    <>
      <Link href="/about#yellow" scroll={false}>
        {" "}
        About{" "}
      </Link>
      <div>
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            {product.name}
          </Link>
        ))}
      </div>
    </>
  );
}
