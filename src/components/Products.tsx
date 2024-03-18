import {Content} from "antd/es/layout/layout";
import {useAppSelector} from "../hooks/store-hooks";
import ProductItem from "./ProductItem";
import {Col, Empty, Pagination, PaginationProps, Row, Spin} from "antd";
import {useState} from "react";

const Products = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {isLoading, products} = useAppSelector(state => state.products);
    const itemsInRow = 8;
    const currentProductList = products.slice((currentPage - 1) * itemsInRow, (currentPage - 1) * itemsInRow + itemsInRow);
    console.log(products)
    const handlePageChange: PaginationProps['onChange'] = (page) => {;
        setCurrentPage(page);
    };

    if (isLoading) {
        return (
            <div>
                <Spin />
            </div>
        )
    }
    return (
        <Content className={"p-5"}>
            {!!products.length ? (
                <>
                    <Row gutter={[16, 16]}>
                        {currentProductList.map(product => (<Col xs={{span: 24}} md={{span: 12}} lg={{span: 6}} key={product.id}><ProductItem product={product} /></Col> ))}
                    </Row>
                    <Pagination current={currentPage} onChange={handlePageChange} total={Math.ceil(products.length/itemsInRow)} style={{marginTop: "20px",textAlign: "center"}} />
                </>
            ) : <Empty />}
        </Content>
    )
};

export default Products;