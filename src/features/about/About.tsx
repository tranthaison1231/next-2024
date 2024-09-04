import { Button } from "@/core/components/ui/button";
import Link from "next/link";

export default function About() {
  return (
    <Link href="/products" prefetch>
      <Button>Products</Button>
    </Link>
  );
}
