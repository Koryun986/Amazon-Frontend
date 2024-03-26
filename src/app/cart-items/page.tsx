"use client"

import {useAppSelector} from "../../hooks/store-hooks";
import {Col, Empty, Row} from "antd";
import ProductItem from "../../components/ProductItem";
import {useEffect, useState} from "react";
import type {IProduct} from "../../types/IProduct";
import {getProductsByIds} from "../../api/requests/product-requests";
import FloatGoHomeButton from "../../shared/FloatGoHomeButtons";
import useCartItems from "../../hooks/cart-item-hooks";

export default function CartItemsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const cartItems = useAppSelector(state => state.cart_items.cartItems);
  useCartItems();

  const getCartItemProducts = async () => {
    try {
      const products = await getProductsByIds(cartItems.map(cartItem => cartItem.product_id));
      setProducts(products);
    } catch (e) {}
  }

  useEffect(() => {
    if (cartItems.length) {
      getCartItemProducts();
    }
  }, [cartItems]);

  return (
    <div className="container mx-auto pt-10">
      <div className="text-2xl font-bold mb-4">Your Cart</div>
      <FloatGoHomeButton />
      {cartItems.length ? (
        <Row gutter={[16, 16]}>
          {products.map(product => (<Col xs={{span: 24}} md={{span: 12}} lg={{span: 6}} key={product.id}><ProductItem product={product} /></Col> ))}
        </Row>
      ) : <Empty />}
    </div>
  )
}