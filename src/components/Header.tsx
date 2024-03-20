"use client"
import {Layout, Typography} from "antd";
import ProductsSearch from "./ProductsSearch";
import HeaderNav from "./HeaderNav";

const { Header: HeaderAntd } = Layout;
const { Title } = Typography;

const Header = () => {
    return (
        <HeaderAntd style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            <Title level={1} style={{color: "white"}}>Amazon</Title>
            <ProductsSearch />
            <div className={"text-white"}>
                <HeaderNav />
            </div>
        </HeaderAntd>
    );
};

export default Header;