"use client"

import {useSearchParams} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {buyProductClientSecret} from "../../api/requests/product-requests";
import {useUser} from "../../hooks/user-hook";
import UnAuthorizedPage from "../../shared/UnAuthorizedPage";
import CheckoutForm from "./_components/CheckoutForm";
import ProductOrderCard from "./_components/ProductOrderCard";
import type {IProduct} from "../../types/IProduct";
import FloatGoHomeButton from "../../shared/FloatGoHomeButtons";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BuyProductPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [product, setProduct] = useState<IProduct & {count: number, amount: number}>(null);
  const [productId, setProductId] = useState<number>(null);
  const [productCount, setProductCount] = useState(0);
  const user = useUser();
  const searchParams = useSearchParams();

  const fetchClientSecret = useCallback(async () => {
    const clientSecret = new URLSearchParams(searchParams).get(
      "payment_intent_client_secret"
    );

    if (clientSecret) {
      setClientSecret(clientSecret);
      return;
    }
    const id = Number.parseInt(searchParams.get("id") || "");
    const count = Number.parseInt(searchParams.get("count") || "");
    const paymentId = searchParams.get("payment_id");
    setProductId(id);
    setProductCount(count);
    const {data} = await buyProductClientSecret({id, count, payment_id: paymentId});
    setClientSecret(data.clientSecret)
    setProduct({...data.product, count, amount: data.amount});
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
      <div className="text-2xl font-bold">Buy Product</div>
      {!!clientSecret && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {!!product && <ProductOrderCard product={product}/>}
          <Elements
            options={{
              clientSecret,
              appearance: {
                theme: "stripe"
              }
            }}
            stripe={stripePromise}
          >
            <CheckoutForm return_url={`http://localhost:3000/buy-product/?id=${productId}&count=${productCount}`} />
          </Elements>
        </div>
      )}
      <FloatGoHomeButton />
    </div>
  )
}
