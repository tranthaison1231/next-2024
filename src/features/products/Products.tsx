import { createProduct, getProducts } from "@/core/actions/products";
import { Button } from "@/core/components/ui/button";
import Link from "next/link";

export default async function ProductsContainer() {
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
      <Button onClick={createProduct}>Create Product</Button>
    </>
  );
}
