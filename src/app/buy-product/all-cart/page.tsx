"use client"

import {useCallback, useEffect, useState} from "react";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {useUser} from "../../../hooks/user-hook";
import UnAuthorizedPage from "../../../shared/UnAuthorizedPage";
import FloatGoHomeButton from "../../../shared/FloatGoHomeButtons";
import {buyCartProductsCheckout} from "../../../api/requests/product-requests";
import type {IProduct} from "../../../types/IProduct";
import CheckoutForm from "../_components/CheckoutForm";
import ProductOrderCard from "./_components/ProductOrderCard";
import {message, Space} from "antd";
import {useSearchParams} from "next/navigation";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BuyAllCartProductsPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [products, setProducts] = useState<(IProduct & {count: number})[]>([]);
  const [amount, setAmount] = useState(0);
  const user = useUser();
  const searchParams = useSearchParams();

  const fetchClientSecret = useCallback(async () => {
    try {
      const clientSecret = new URLSearchParams(searchParams).get(
        "payment_intent_client_secret"
      );

      if (clientSecret) {
        setClientSecret(clientSecret);
        return;
      }
      const {data} = await buyCartProductsCheckout();
      setClientSecret(data.clientSecret)
      const changedProducts = data.products.map(product => {
        const cartItem = data.cartItems.find(item => item.product_id === product.id);
        if (!cartItem) {
          return {...product, count: 0}
        }
        return {...product, count: cartItem.count};
      });
      setProducts(changedProducts);
      setAmount(data.amount);
    } catch (e) {
      message.error("something went wrong");
    }
  }, []);

  useEffect(() => {
    fetchClientSecret();
  }, []);

  if (!user) {
    return (
      <UnAuthorizedPage />
    )
  }

  return (
    <div id="checkout" className="container mx-auto pt-10">
      <div className="text-2xl font-bold">Buy Products</div>
      {!!clientSecret && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <div className="text-lg">Amount: <span className="font-bold">{(amount / 100).toLocaleString("en-US", {style:"currency", currency:"USD"})}</span></div>
            <Space direction="vertical">
              {products.map(product => (<ProductOrderCard product={product} />))}
            </Space>
          </div>
          <Elements
            options={{
              clientSecret,
              appearance: {
                theme: "stripe"
              }
            }}
            stripe={stripePromise}
          >
            <CheckoutForm return_url={"http://localhost:3000/buy-product/all-cart/"} />
          </Elements>
        </div>
      )}
      <FloatGoHomeButton />
    </div>
  )
}
