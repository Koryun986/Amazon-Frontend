"use client"

import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import StripeWrappedComponent from "./_components/StripeWrappedComponent";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function SucceedBuyProductPage() {
return (
    <Elements stripe={stripePromise}>
      <StripeWrappedComponent />
    </Elements>
  )
}