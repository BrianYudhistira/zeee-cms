import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/shared/providers/providers";

export const metadata: Metadata = {
  title: "ZeeeHub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="theme-light">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
