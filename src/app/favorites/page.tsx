"use client"

import useFavorites from "../../hooks/favorite-hooks";
import {useAppSelector} from "../../hooks/store-hooks";
import {Col, Empty, Row} from "antd";
import ProductItem from "../../components/ProductItem";
import {useEffect, useState} from "react";
import type {IProduct} from "../../types/IProduct";
import {getProductsByIds} from "../../api/requests/product-requests";
import FloatGoHomeButton from "../../shared/FloatGoHomeButtons";

export default function FavoritePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const favorites = useAppSelector(state => state.favorites.favorites);
  useFavorites();

  const getFavoriteProducts = async () => {
    const products = await getProductsByIds(favorites);
    setProducts(products);
  }

  useEffect(() => {
    if (favorites.length) {
     getFavoriteProducts();
    }
  }, [favorites]);

  return (
    <div className="container mx-auto pt-10">
      <div className="text-2xl font-bold mb-4">Your Favorites</div>
      <FloatGoHomeButton />
      {favorites.length ? (
        <Row gutter={[16, 16]}>
          {products.map(product => (<Col xs={{span: 24}} md={{span: 12}} lg={{span: 6}} key={product.id}><ProductItem product={product} /></Col> ))}
        </Row>
      ) : <Empty />}
    </div>
  )
}