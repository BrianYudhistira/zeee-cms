"use client";

import { AppThemeProvider } from "./theme.provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppThemeProvider>{children}</AppThemeProvider>;
}
