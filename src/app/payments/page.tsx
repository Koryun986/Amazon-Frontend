"use client"

import {useEffect, useState} from "react";
import {useUser} from "../../hooks/user-hook";
import UnAuthorizedPage from "../../shared/UnAuthorizedPage";
import {fetchPayments} from "../../api/requests/product-requests";
import type {IProduct} from "../../types/IProduct";
import {Empty, Space, Spin} from "antd";
import PaymentProductItem from "./_components/PaymentProductItem";
import FloatGoBackButton from "../../shared/FloatGoBackButton";

export default function PaymentsPage() {
  const [payments, setOrders] = useState<(IProduct & {count: number, date: number, status: string, payment_id: string})[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>(null);
  const user = useUser();

  const getPaymentsFromResult = (data: {products: IProduct[], info: {id: number, count: number}[]}) => {
    const payments = [];
    for (const productInfo of data.info) {
      const product = data.products.find(product => product.id === productInfo.id);
      if (!product) {
        continue;
      }
      payments.push({...product, ...productInfo});
    }
    return payments;
  }

  const getPayments = async () => {
    try {
      setIsLoading(true);
      const {data} = await fetchPayments();
      const payments = getPaymentsFromResult(data);
      setOrders(payments);
    } catch (e) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPayments();
  }, [user]);

  if (!user) {
    return (<UnAuthorizedPage />)
  }

  return (
    <div className="container mx-auto pt-5">
      <div className="text-2xl font-bold mb-4">Your Payments</div>
      <FloatGoBackButton />
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <>
          {payments.length ? (
            <Space direction="vertical" style={{width: "100%"}}>
              {payments.map((payment, index) => <PaymentProductItem payment={payment} key={payment.payment_id + payment.id} />)}
            </Space>
          ) : (
            <Empty />
          )}
        </>
      )}
    </div>
  )
}
