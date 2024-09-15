'use client';

import { useParams, usePathname, useSearchParams } from 'next/navigation';

export default function Product() {
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get('search');

  return (
    <div>
      Product: with {pathname} at {params.id} with search {search}
    </div>
  );
}
