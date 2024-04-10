"use client"

import {useEffect, useState} from "react";
import {useUser} from "../../hooks/user-hook";
import UnAuthorizedPage from "../../shared/UnAuthorizedPage";
import {fetchOrders} from "../../api/requests/product-requests";
import type {IProduct} from "../../types/IProduct";
import {Empty, Space, Spin} from "antd";
import OrderItem from "./_components/OrderItem";
import FloatGoBackButton from "../../shared/FloatGoBackButton";

export default function OrderPage() {
  const [orders, setOrders] = useState<(IProduct & {count: number, date: number, status: string, payment_id: string})[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>(null);
  const user = useUser();

  const getOrdersFromResult = (data: {products: IProduct[], info: {id: number, count: number}[]}) => {
    const orders = [];
    for (const productInfo of data.info) {
      const product = data.products.find(product => product.id === productInfo.id);
      if (!product) {
        continue;
      }
      orders.push({...product, ...productInfo});
    }
    return orders;
  }

  const getOrders = async () => {
    try {
      setIsLoading(true);
      const {data} = await fetchOrders();
      const orders = getOrdersFromResult(data);
      setOrders(orders);
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getOrders();
  }, [user]);


  if (!user) {
    return (<UnAuthorizedPage />)
  }

  return (
    <div className="container mx-auto pt-5">
      <div className="text-2xl font-bold mb-4">Your Orders</div>
      <FloatGoBackButton />
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <>
          {orders.length ? (
            <Space direction="vertical" style={{width: "100%"}}>
              {orders.map((order, index) => <OrderItem order={order} key={order.payment_id + order.id} />)}
            </Space>
          ) : (
            <Empty />
          )}
        </>
      )}
    </div>
  )
}
