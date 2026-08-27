import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SidebarTheme = "light" | "blue" | "dark";
export type IconSize = "sm" | "md" | "lg";
export type FontSize = "sm" | "md" | "lg";

interface SidebarThemeStore {
  sidebarTheme: SidebarTheme;
  setSidebarTheme: (theme: SidebarTheme) => void;
  iconSize: IconSize;
  setIconSize: (size: IconSize) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

export const useSidebarThemeStore = create<SidebarThemeStore>()(
  persist(
    (set) => ({
      sidebarTheme: "light",
      setSidebarTheme: (theme) => set({ sidebarTheme: theme }),
      iconSize: "md",
      setIconSize: (size) => set({ iconSize: size }),
      fontSize: "md",
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: "sidebar-theme",
    }
  )
);
