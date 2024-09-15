"use client";

import type { ReactNode } from "react";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
} from "@/core/components/atoms/dialog";
import { useRouter } from "next/navigation";

export function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogOverlay>
        <DialogContent className="overflow-y-hidden">{children}</DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
