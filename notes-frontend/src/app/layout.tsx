import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("Server-rendered className:", inter.className);

  if (typeof window !== "undefined") {
    console.log("Client-rendered className:", inter.className);
  }

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}