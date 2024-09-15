import type { ReactNode } from "react";

interface LabelProps {
  name: string;
  children: ReactNode;
}

export function Label({ name, children }: LabelProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className=" text-sm font-semibold mb-2">{name}</p>
      {children}
    </div>
  );
}
