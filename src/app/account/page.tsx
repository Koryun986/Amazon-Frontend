"use client"
import {Avatar, Divider} from "antd";
import {HeartFilled, HomeOutlined, ProductOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {useUser} from "../../hooks/user-hook";
import UnAuthorizedPage from "../../shared/UnAuthorizedPage";
import AccountOption from "./_components/AccountOption";

const AccountPage = () => {
    const user = useUser();

    if (!user) {
        return (<UnAuthorizedPage />)
    }

    return (
      <div className="container mx-auto">
          <div className="pt-10 flex flex-col items-center gap-4">
              <div className="text-3xl font-bold mb-5">Your Account</div>
              <Avatar size={50} style={{backgroundColor: "#001529", fontSize: "16px"}}>{user.first_name}</Avatar>
              <div className="text-2xl font-bold">{user.first_name} {user.last_name}</div>
              <div className="text-lg font-semibold">{user.email}</div>
              <AccountOption title={"Your Products"} href={"/account/products"} icon={<ProductOutlined />} />
              <AccountOption title={"Your Favorites"} href={"/favorites"} icon={<HeartFilled />} />
              <AccountOption title={"Your Cart Items"} href={"/cart-items"} icon={<ShoppingCartOutlined />} />
              <AccountOption title={"Your Addresses"} href={"/account/addresses"} icon={<HomeOutlined />} />
              <Divider />
              <AccountOption title={"Change Password"} href={"/auth/change-password"} />
          </div>
      </div>
    )
};

export default AccountPage;