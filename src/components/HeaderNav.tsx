"use client"
import {Flex} from "antd";
import FavoritesBadge from "./FavoritesBadge";
import CartItemsBadge from "./CartItemsBadge";

const HeaderNav = () => {
  return (
    <Flex align={"center"} gap={"middle"}>
      <CartItemsBadge />
      <FavoritesBadge />
    </Flex>
  )
};

export default HeaderNav;