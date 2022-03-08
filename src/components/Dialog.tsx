import { useState } from "react";
import { Dialog as HUIDialog } from "@headlessui/react";

export function Dialog({
  title,
  isOpen,
  setIsOpen,
  children,
}: {
  title?: string;
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
        <HUIDialog.Overlay className="fixed inset-0 bg-black opacity-30 cursor-pointer" />

        <div className="relative bg-white rounded max-w-md mx-auto w-full p-4">
          {title ? (
            <HUIDialog.Title className="mb-4">{title}</HUIDialog.Title>
          ) : null}
          {children}
        </div>
      </div>
    </HUIDialog>
  );
}
