import {Col, Empty, Row} from "antd";
import ProductItem from "./ProductItem";
import ProductsPagination from "./ProductsPagination";
import {getAllProducts} from "../api/requests/product-requests";
import type {IProduct} from "../types/IProduct";

const Products = async ({searchParams}) => {
  const params = new URLSearchParams(searchParams);
  let products: IProduct[];
  try {
    products = await getAllProducts(params.toString()) as IProduct[];
  } catch (e) {
    products = [];
  }

  return (
    <>
      <Row gutter={[16, 16]}>
          {products.map(product => (<Col xs={{span: 24}} md={{span: 12}} lg={{span: 6}} key={product.id}><ProductItem product={product} /></Col> ))}
      </Row>
      {!products.length && <Empty />}
      <ProductsPagination />
    </>
  )
};

export default Products;