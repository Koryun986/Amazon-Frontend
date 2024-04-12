"use client"

import FloatGoBackButton from "../../../shared/FloatGoBackButton";
import {Empty, Space, Spin} from "antd";
import {useEffect, useState} from "react";
import {useUser} from "../../../hooks/user-hook";
import UnAuthorizedPage from "../../../shared/UnAuthorizedPage";
import ProductSubscriptionItem from "./_components/ProductSubscriptionItem";
import {getSubscriptionsOfProducts} from "../../../api/requests/subscription-requests";
import type {IProduct} from "../../../types/IProduct";

export default function ProductsSubscriptionsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>(null);
  const user = useUser();

  const getSubscriptions = async () => {
    try {
      setIsLoading(true);
      const {data} = await getSubscriptionsOfProducts();
      setProducts(data.products);
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSubscriptions();
  }, [user]);

  if (!user) {
    return (<UnAuthorizedPage />)
  }

  return (
    <div className="container mx-auto pt-5">
      <div className="text-2xl font-bold mb-4">Your Subscriptions</div>
      <FloatGoBackButton />
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <>
          {products.length ? (
            <Space direction="vertical" style={{width: "100%"}}>
              {products.map((product) => <ProductSubscriptionItem product={product} key={product.id}/>)}
            </Space>
          ) : (
            <Empty />
          )}
        </>
      )}
    </div>
  )
}
