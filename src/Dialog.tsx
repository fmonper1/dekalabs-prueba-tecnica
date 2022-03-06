import { useState } from "react";
import { Dialog as HUIDialog } from "@headlessui/react";

export function Dialog({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <HUIDialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <HUIDialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded max-w-sm mx-auto">
          {children}
        </div>
      </div>
    </HUIDialog>
  );
}
