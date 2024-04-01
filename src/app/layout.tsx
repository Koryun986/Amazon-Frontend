import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter } from "next/font/google";
import StoreProvider from "../providers/StoreProvider";
import AntdMessageProvider from "../providers/AntdMessageProvider";

import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amazon",
  description: "Amazon clone app with NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <AntdRegistry>
            <AntdMessageProvider>
              {children}
            </AntdMessageProvider>
          </AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
