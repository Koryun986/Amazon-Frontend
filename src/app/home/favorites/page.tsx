"use client"

import {Col, Empty, Row} from "antd";
import {useEffect, useState} from "react";
import useFavorites from "../../../hooks/favorite-hooks";
import {useAppSelector} from "../../../hooks/store-hooks";
import ProductItem from "../../../components/ProductItem";
import {getProductsByIds} from "../../../api/requests/product-requests";
import FloatGoHomeButton from "../../../shared/FloatGoHomeButtons";
import type {IProduct} from "../../../types/IProduct";
import {useSearchParams} from "next/navigation";

export default function FavoritePage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const favorites = useAppSelector(state => state.favorites.favorites);
  const searchParams = useSearchParams();
  useFavorites();

  const getFavoriteProducts = async () => {
    try {
      const params = new URLSearchParams(searchParams);
      const products = await getProductsByIds(favorites, params.toString());
      setProducts(products);
    } catch (e) {}
  }

  useEffect(() => {
    if (favorites.length) {
     getFavoriteProducts();
    }
  }, [favorites, searchParams]);



  return (
    <>
      <div className="text-2xl font-bold mb-4">Your Favorites</div>
      {favorites.length ? (
        <Row gutter={[16, 16]}>
          {products.map(product => (<Col xs={{span: 24}} md={{span: 12}} lg={{span: 6}} key={product.id}><ProductItem product={product} /></Col> ))}
        </Row>
      ) : <Empty />}
    </>
  )
}