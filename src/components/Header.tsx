"use client"
import {Flex, Layout, Typography} from "antd";
import ProductsSearch from "./ProductsSearch";

const { Header: HeaderAntd } = Layout;
const { Title } = Typography;

const Header = () => {
    return (
        <HeaderAntd style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            <Title level={1} style={{color: "white"}}>Amazon</Title>
            <ProductsSearch />
        </HeaderAntd>
    );
};

export default Header;