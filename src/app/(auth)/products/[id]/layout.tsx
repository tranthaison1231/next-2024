import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Lazada - Product',
  description: 'Generated by create next app'
};

export default function ProductLayout({
  delivery,
  info
}: {
  delivery: ReactNode;
  info: ReactNode;
}) {
  return (
    <div className="grid grid-cols-2">
      {delivery}
      {info}
    </div>
  );
}
