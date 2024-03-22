"use client"
import {Suspense} from "react";
import {Content} from "antd/es/layout/layout";
import {useAppSelector} from "../hooks/store-hooks";
import ProductItem from "./ProductItem";
import {Col, Empty, Pagination, PaginationProps, Row, Spin} from "antd";
import {FC, useState} from "react";
import {IProduct} from "../types/IProduct";

interface ProductsProps {
    products: IProduct[];
}

const Products: FC<ProductsProps> = ({products}) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsInRow = 8;
    const currentProductList = products.slice((currentPage - 1) * itemsInRow, (currentPage - 1) * itemsInRow + itemsInRow);
    const handlePageChange: PaginationProps['onChange'] = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                {currentProductList.map(product => (<Col xs={{span: 24}} md={{span: 12}} lg={{span: 6}} key={product.id}><ProductItem product={product} /></Col> ))}
            </Row>
            <Pagination current={currentPage} onChange={handlePageChange} total={Math.ceil(products.length/itemsInRow)} style={{marginTop: "20px",textAlign: "center"}} />
        </>
    )
};

export default Products;