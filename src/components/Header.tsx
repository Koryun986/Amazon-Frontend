"use client"
import {Avatar, Button, Flex, Layout, Space, Typography} from "antd";
import ProductsSearch from "./ProductsSearch";
import {useAppSelector} from "../hooks/store-hooks";
import {UserOutlined} from "@ant-design/icons";
import Link from "next/link";

const { Header: HeaderAntd } = Layout;
const { Title } = Typography;

const Header = () => {
    const user = useAppSelector(state => state.user.user);
    console.log(user)
    return (
        <HeaderAntd style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
            <Title level={1} style={{color: "white"}}>Amazon</Title>
            <ProductsSearch />
            <div className={"text-white"}>
                {
                    user ? (
                        <Avatar size={40} icon={<UserOutlined />} />
                    ) : (
                        <Space>
                            <Link href={"/auth/login"}>
                                <Button>Login</Button>
                            </Link>
                            <Link href={"/auth/registration"}>
                                <Button>Register</Button>
                            </Link>
                        </Space>
                    )
                }
            </div>
        </HeaderAntd>
    );
};

export default Header;