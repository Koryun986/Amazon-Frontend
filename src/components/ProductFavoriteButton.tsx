import {FC, useEffect, useState} from "react";
import {Button} from "antd";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import useFavorites from "../hooks/favorite-hooks";

interface ProductFavoriteButtonProps {
  id: number;
}

const ProductFavoriteButton: FC<ProductFavoriteButtonProps> = ({id}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { toggleFavorite, isFavorite: isFavoriteCheck } = useFavorites();

  const setInitialFavorite = async () => {
    const isFavorite = await isFavoriteCheck(id);
    setIsFavorite(isFavorite);
  }

  useEffect(() => {
    setInitialFavorite();
  }, [])

  const handleToggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await toggleFavorite(id);
      setIsFavorite(prevState => !prevState);
    } catch (e) {}
  }

  return (
    <Button onClick={handleToggleFavorite}>{!isFavorite ? <HeartOutlined style={{fontSize: "20px"}}/> : <HeartFilled style={{fontSize: "20px"}} />}</Button>
  )
};

export default ProductFavoriteButton;