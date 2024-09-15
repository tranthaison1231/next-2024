import type { ReactNode } from 'react';

export default function AuthLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return <div className="bg-gray-100 text-stone-500">{children}</div>;
}
