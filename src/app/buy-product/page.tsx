"use client"

import {useSearchParams} from "next/navigation";
import {useCallback} from "react";
import {EmbeddedCheckoutProvider, EmbeddedCheckout} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {buyProductClientSecret} from "../../api/requests/product-requests";
import {useUser} from "../../hooks/user-hook";
import UnAuthorizedPage from "../../shared/UnAuthorizedPage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BuyProductPage() {
  const user = useUser();
  const searchParams = useSearchParams();

  const fetchClientSecret = useCallback(() => {
    const id = Number.parseInt(searchParams.get("id") || "");
    const count = Number.parseInt(searchParams.get("count") || "");
    return buyProductClientSecret({id, count});
  }, []);

  const options = {fetchClientSecret};

  if (!user) {
    return (
      <UnAuthorizedPage />
    )
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}