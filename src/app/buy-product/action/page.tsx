"use client"

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import StripeWrappedComponent from "./_components/StripeWrappedComponent";
import {useSearchParams} from "next/navigation";
import {buyProduct} from "../../../api/requests/product-requests";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function SucceedBuyProductPage() {
  const searchParams = useSearchParams();

  const paymentSuccess = async () => {
    const id = Number.parseInt(searchParams.get("id") || "");
    const count = Number.parseInt(searchParams.get("count") || "");
    await buyProduct({id, count});
  }

  return (
    <Elements stripe={stripePromise}>
      <StripeWrappedComponent onSuccess={paymentSuccess} />
    </Elements>
  )
}