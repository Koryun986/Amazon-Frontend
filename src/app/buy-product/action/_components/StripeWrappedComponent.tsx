"use client"

import {useEffect} from "react";
import {useStripe} from "@stripe/react-stripe-js";
import {useRouter, useSearchParams} from "next/navigation";
import {message} from "antd";

interface StripeWrappedComponentProps {
  onSuccess: () => Promise<void>;
}

export default function StripeWrappedComponent({onSuccess}: StripeWrappedComponentProps) {
  const stripe = useStripe();
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentSuccess = async () => {
    try {
      await onSuccess();
      message.success("Payment has been successfully completed")
    } catch (e) {
      console.log(e, "error");
      message.error("Oops something went wrong");
    }
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = searchParams.get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(async ({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          await paymentSuccess();
          break;
        case "processing":
          message.info("Your payment is processing.");
          break;
        case "requires_payment_method":
          message.error("Your payment was not successful, please try again.");
          break;
        default:
          message.error("Something went wrong.");
          break;
      }
      router.push("/");
    });
  }, [stripe]);

  return (
    <div></div>
  )
}