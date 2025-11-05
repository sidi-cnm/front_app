// @ts-expect-error: allow side-effect CSS import without type declarations
import "@/styles/globals.css";

import type { Metadata } from "next";
import Providers from "./providers";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: "Medical admin UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
