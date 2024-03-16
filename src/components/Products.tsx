import {Content} from "antd/es/layout/layout";
import {useAppSelector} from "../hooks/store-hooks";

const Products = () => {
    const {isLoading, products} = useAppSelector(state => state.products);
    console.log(products)
    return (
        <Content>

        </Content>
    )
};

export default Products;