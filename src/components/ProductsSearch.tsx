"use client"
import {Input} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import useDebounce from "../hooks/debounce-hook";
import {usePathname, useSearchParams, useRouter} from "next/navigation";

const ProductsSearch = () => {
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce(value);
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathName = usePathname();

    const handleDebouncedValueChange = () => {
        console.log(searchParams.toString())
        const params = new URLSearchParams(searchParams);
        if (!debouncedValue) {
            params.delete("text");
        } else {
            params.set("text", debouncedValue);
        }
        replace(`${pathName}?${params.toString()}`);
    };


    useEffect(() => {
        handleDebouncedValueChange();
    }, [debouncedValue])

    return (
        <>
            <Input size="middle" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search product..." prefix={<SearchOutlined />} style={{maxWidth: "30%"}} />
        </>
    );
};

export default ProductsSearch;