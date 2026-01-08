import { FC } from "react";

import { geistMono, geistSans } from "@/config";

import "@/styles/globals.css";
import type { Metadata } from "next";
import { AppProvider } from "@/providers";

export const metadata: Metadata = {
  title: "Tra Cứu Văn Bản Pháp Luật",
  description: "Search and retrieve updated legal documents and regulations",
};

type TProps = Readonly<IChildren>;
const RootLayout: FC<TProps> = ({ children }) => (
  <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <AppProvider>{children}</AppProvider>
    </body>
  </html>
);

export default RootLayout;
