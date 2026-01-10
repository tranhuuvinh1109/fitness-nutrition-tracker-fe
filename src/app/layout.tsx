import { FC } from "react";

import { geistMono, geistSans } from "@/config";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { AppProvider, TanstackProvider } from "@/providers";

export const metadata: Metadata = {
  title: "Tra Cứu Văn Bản Pháp Luật",
  description: "Search and retrieve updated legal documents and regulations",
};
const RootLayout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <TanstackProvider>
        <AppProvider>{children}</AppProvider>
      </TanstackProvider>
    </body>
  </html>
);

export default RootLayout;
