import {Badge} from "antd";
import {ShoppingOutlined} from "@ant-design/icons";
import Link from "next/link";
import {useAppSelector} from "../hooks/store-hooks";

const CartItemsBadge = () => {
  const cartItems = useAppSelector(state => state.cart_items.cartItems);

  return (
    <Link href={"/cart-items"} >
      <Badge count={cartItems?.length || 0} showZero >
        <ShoppingOutlined style={{color: "white", fontSize: "25px"}} />
      </Badge>
    </Link>
  )
};

export default CartItemsBadge;