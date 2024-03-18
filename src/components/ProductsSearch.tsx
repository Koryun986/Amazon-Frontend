"use client"
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useState} from "react";
import useDebounce from "../hooks/debounce-hook";
import useFilterByParams from "../hooks/filter-by-params-hook";

const ProductsSearch = () => {
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce(value);
    useFilterByParams(debouncedValue, "text");

    return (
        <>
            <Input size="middle" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search product..." prefix={<SearchOutlined />} style={{maxWidth: "30%"}} />
        </>
    );
};

export default ProductsSearch;