import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lazada - Product",
  description: "Generated by create next app",
};

interface ProductProps {
  params: {
    id: string;
  };
}

export default function Product({ params }: ProductProps) {
  return <div> Products: {params.id} </div>;
}
