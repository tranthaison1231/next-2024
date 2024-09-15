'use client';
import { Button } from '@/core/components/atoms/button';
import { useRouter } from 'next/navigation';

export default function About() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/products');
  };
  return <Button onClick={handleClick}>Products</Button>;
}
