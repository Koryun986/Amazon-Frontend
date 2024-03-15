"use client"
import {Suspense} from "react";
import {Layout} from "antd";
import Header from "./Header";
import Spinner from "../shared/Spinner";

const MainLayout = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Layout>
                <Header />
            </Layout>
        </Suspense>
    );
};

export default MainLayout;