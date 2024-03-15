"use client"
import {Suspense} from "react";
import {Layout} from "antd";
import Header from "./Header";
import Spinner from "../shared/Spinner";
import {MainLayoutSideBar} from "./MainLayoutSideBar";

const MainLayout = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Layout style={{minHeight: "100vh"}}>
                <Header />
                <Layout>
                    <MainLayoutSideBar />
                </Layout>
            </Layout>
        </Suspense>
    );
};

export default MainLayout;