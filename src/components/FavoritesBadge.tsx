import {Badge} from "antd";
import {HeartOutlined} from "@ant-design/icons";
import Link from "next/link";
import {useAppSelector} from "../hooks/store-hooks";
import useFavorites from "../hooks/favorite-hooks";
import {useEffect} from "react";

const FavoritesBadge = () => {
  const {fetchFavorites} = useFavorites();
  const user = useAppSelector(state => state.user.user);
  const favorites = useAppSelector(state => state.favorites.favorites);

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  return (
    <Link href={"/favorites"} >
      <Badge count={favorites.length} showZero >
        <HeartOutlined style={{color: "white", fontSize: "25px"}} />
      </Badge>
    </Link>
  );
};

export default FavoritesBadge;