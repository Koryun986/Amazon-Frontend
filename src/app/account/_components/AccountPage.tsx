"use client"
import Link from "next/link";
import {Avatar, Button, Divider} from "antd";
import {HeartFilled, ProductOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import UnAuthorizedPage from "../../../shared/UnAuthorizedPage";
import {useUser} from "../../../hooks/user-hook";

const AccountPage = () => {
    const user = useUser();

    if (!user) {
        return (<UnAuthorizedPage />)
    }

    return (
        <div className="container mx-auto">
            <div className="pt-10 flex flex-col items-center gap-4">
                <Avatar size={50} style={{backgroundColor: "#001529", fontSize: "16px"}}>{user.first_name}</Avatar>
                <div className="text-2xl font-bold">{user.first_name} {user.last_name}</div>
                <div className="text-lg font-semibold">{user.email}</div>
                <Link href="/account/products">
                    <Button size={"large"} style={{height: "100%", display: "flex", alignItems: "center"}}>
                        <ProductOutlined /> Your Products
                    </Button>
                </Link>
                <Link href="/favorites" style={{height: "100%", display: "flex", alignItems: "center"}}>
                    <Button size={"large"}>
                        <HeartFilled /> Your Favorites
                    </Button>
                </Link>
                <Link href="/cart-items">
                    <Button size={"large"} style={{height: "100%", display: "flex", alignItems: "center"}}>
                        <ShoppingCartOutlined /> Your Cart Items
                    </Button>
                </Link>
                <Divider />
                <Link href="/auth/change-password">
                    <Button size={"large"} style={{height: "100%", display: "flex", alignItems: "center"}}>
                        Change Password
                    </Button>
                </Link>
            </div>
        </div>
    )
};

export default AccountPage;