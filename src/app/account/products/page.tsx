"use client"
import {useEffect, useState} from "react";
import {Empty, Space} from "antd";
import {useUser} from "../../../hooks/user-hook";
import {getAccountProducts} from "../../../api/requests/product-requests";
import AccountProductItem from "./_components/AccountProductItem";
import AddProductButton from "./_components/AddProductButton";
import UnAuthorizedPage from "../../../shared/UnAuthorizedPage";
import FloatGoBackButton from "../../../shared/FloatGoBackButton";
import type {IProduct} from "../../../types/IProduct";

export default function AccountProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productChangeTrigger, setProductChangeTrigger] = useState(false);
  const user = useUser();

  const fetchProducts = async () => {
    try {
      const products = await getAccountProducts()
      setProducts(products);
    } catch (e) {}
  }

  useEffect(() => {
    fetchProducts();
  }, [user, productChangeTrigger]);

  if (!user) {
    return (<UnAuthorizedPage />)
  }

  return (
    <>
      <div className="container mx-auto pt-10">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold mb-4">Your Products</div>
          <AddProductButton onAdd={() => setProductChangeTrigger(prevState => !prevState)} />
        </div>
        <Space
          style={{width: "100%"}}
          direction={"vertical"}
        >
          {products.length ? products.map(product => (<AccountProductItem product={product} key={product.id} onChange={() => setProductChangeTrigger(prevState => !prevState)} />)) : <Empty />}
        </Space>
      </div>
      <FloatGoBackButton />
    </>
  )
};