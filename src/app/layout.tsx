// @ts-ignore: Cannot find module or type declarations for side-effect import of '../styles/globals.css'.
import  "@/styles/globals.css";
import { ReactNode } from "react";

import { SITE_NAME } from "@/lib/site";
export const metadata = { title: SITE_NAME, description: "Medical admin UI" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
