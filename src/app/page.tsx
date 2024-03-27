import Products from "../components/Products";
import Header from "../components/Header";
import {Layout} from "antd";
import {MainLayoutSideBar} from "../components/MainLayoutSideBar";
import {Content} from "antd/es/layout/layout";

export default async function Home({searchParams}) {
  return (
    <>
      <Layout style={{minHeight: "100vh"}}>
        <Header />
        <Layout>
          <MainLayoutSideBar />
          <Content className={"p-5"}>
            <Products searchParams={searchParams} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
