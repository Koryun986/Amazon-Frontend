"use client"

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import StripeWrappedComponent from "../../action/_components/StripeWrappedComponent";
import {buyCartProducts} from "../../../../api/requests/product-requests";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function SucceedBuyProductPage() {
  const paymentSuccess = async () => {
    await buyCartProducts();
  }

  return (
    <Elements stripe={stripePromise}>
      <StripeWrappedComponent onSuccess={paymentSuccess} />
    </Elements>
  )
}