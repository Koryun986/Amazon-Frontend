import type { Metadata } from "next";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "../providers/StoreProvider";
import Home from "./page";
import Header from "../components/Header";
import {Empty, Layout} from "antd";
import {MainLayoutSideBar} from "../components/MainLayoutSideBar";
import {Content} from "antd/es/layout/layout";
import Products from "../components/Products";
import AntdStyledComponentsRegistry from "../providers/AntdStyledComponentsRegistry";

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
            <AntdStyledComponentsRegistry>
              {children}
            </AntdStyledComponentsRegistry>
          </AntdRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
