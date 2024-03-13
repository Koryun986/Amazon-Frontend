"use client"
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";

const ProductsSearch = () => {
    return (
        <>
            <Input size="middle" placeholder="Search product..." prefix={<SearchOutlined />} style={{maxWidth: "30%"}} />
        </>
    );
};

export default ProductsSearch;