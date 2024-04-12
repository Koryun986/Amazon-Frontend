"use client"

import {loadStripe} from "@stripe/stripe-js";
import {useUser} from "../../../hooks/user-hook";
import UnAuthorizedPage from "../../../shared/UnAuthorizedPage";
import {useCallback, useEffect, useState} from "react";
import {IProduct} from "../../../types/IProduct";
import {useSearchParams} from "next/navigation";
import {subscribeProduct} from "../../../api/requests/subscription-requests";
import ProductOrderCard from "../../buy-product/_components/ProductOrderCard";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "../../buy-product/_components/CheckoutForm";
import FloatGoHomeButton from "../../../shared/FloatGoHomeButtons";
import {AxiosError} from "axios";
import Link from "next/link";
import {Button} from "antd";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function ProductSubscriptionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [product, setProduct] = useState<IProduct>(null);
  const [productId, setProductId] = useState<number>(null);
  const searchParams = useSearchParams();
  const user = useUser();

  const fetchClientSecret = useCallback(async () => {
    try {
      const clientSecret = new URLSearchParams(searchParams).get(
        "payment_intent_client_secret"
      );

      if (clientSecret) {
        setClientSecret(clientSecret);
        return;
      }
      const id = Number.parseInt(searchParams.get("id") || "");
      setProductId(id);
      setIsLoading(true);
      const {data} = await subscribeProduct(id);
      setClientSecret(data.client_secret)
      setProduct(data.product);
    } catch (e) {
      console.log(e, "error")
      if (e instanceof AxiosError) {
        setError(e.response.data.message);
        return;
      }
      setError("Oops something went wrong");
    } finally {
      setIsLoading(false);
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

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-bold flex-col gap-4">
        <div>{error}</div>
        <Link href={"/home"}>
          <Button>Home Page</Button>
        </Link>
      </div>
    )
  }

  return (
    <div id="checkout" className="container mx-auto pt-10">
      <div className="text-2xl font-bold">Buy Subscription</div>
      {!!clientSecret && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div>
            {!!product && <ProductOrderCard product={{...product, count: 1, amount: product.price * 100}}/>}
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
            <CheckoutForm return_url={`http://localhost:3000/subscriptions/product/?id=${productId}`} />
          </Elements>
        </div>
      )}
      <FloatGoHomeButton />
    </div>
  )
}
