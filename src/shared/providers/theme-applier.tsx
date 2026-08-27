"use client";

import { useEffect } from "react";
import { useSidebarThemeStore } from "@/shared/store/sidebar-theme.store";

/**
 * Reads sidebarTheme from the store and injects the matching
 * class (theme-light | theme-blue | theme-dark) onto <html>.
 * Must be rendered inside the Providers tree.
 */
export function ThemeApplier() {
  const sidebarTheme = useSidebarThemeStore((s) => s.sidebarTheme);
  const iconSize = useSidebarThemeStore((s) => s.iconSize);
  const fontSize = useSidebarThemeStore((s) => s.fontSize);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("theme-light", "theme-blue", "theme-dark");
    html.classList.add(`theme-${sidebarTheme}`);
    html.dataset.iconSize = iconSize;
    html.dataset.fontSize = fontSize;
  }, [sidebarTheme, iconSize, fontSize]);

  return null;
}
