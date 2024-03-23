import {MinusCircleFilled, PlusCircleFilled} from "@ant-design/icons";
import {Button, Space} from "antd";
import {FC} from "react";
import useCartItems from "../hooks/cart-item-hooks";

interface ProductCartItemProps {
  id: number;
}

const ProductCartItemButton: FC<ProductCartItemProps> = ({id}) => {
  const { addCartItem, removeCartItem, setCartItem, cartItemCount } = useCartItems(id);

  const handleIncrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addCartItem();
  }

  const handleDecrease = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeCartItem();
  }

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await setCartItem();
  }
  return (
    <Space direction={"vertical"} align={"center"}>
      <div className="flex gap-4">
        <MinusCircleFilled style={{fontSize: "20px"}} onClick={handleDecrease}/>
        <div>{cartItemCount}</div>
        <PlusCircleFilled style={{fontSize: "20px"}} onClick={handleIncrease}/>
      </div>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </Space>
  )
};

export default ProductCartItemButton;