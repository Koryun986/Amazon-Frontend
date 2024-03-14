import Link from "next/link";
import {HeartOutlined, ShoppingCartOutlined, ShoppingOutlined} from "@ant-design/icons";
import {Button, Flex} from "antd";

const HeaderNav = () => {

    return (
        <Flex align={"center"} gap={"middle"}>
            <Link href={"/cart-items"} >
                <ShoppingOutlined style={{color: "white", fontSize: "25px"}} />
            </Link>
            <Link href={"/favorites"} >
                <HeartOutlined style={{color: "white", fontSize: "25px"}} />
            </Link>
            <Link href={"/auth/login"}>
                <Button>Login</Button>
            </Link>
            <Link href={"/auth/registration"}>
                <Button>Register</Button>
            </Link>
        </Flex>
    )
};

export default HeaderNav;