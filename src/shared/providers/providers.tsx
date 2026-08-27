"use client";

import { ThemeApplier } from "./theme-applier";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeApplier />
      {children}
    </>
  );
}
