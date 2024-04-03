import Header from "../../components/Header";
import {Layout} from "antd";
import {MainLayoutSideBar} from "../../components/MainLayoutSideBar";
import {Content} from "antd/es/layout/layout";

export default function HomeLayout({
   children,
 }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Layout style={{minHeight: "100vh"}} >
        <Header />
        <Layout hasSider>
          <MainLayoutSideBar />
          <Content className={"p-5"}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </>
  );
}