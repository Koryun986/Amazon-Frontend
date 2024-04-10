"use client"
import {useEffect, useState} from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {Button, message as messageApi} from "antd";
import {useRouter, useSearchParams} from "next/navigation";

interface CheckoutFormProps {
  return_url: string;
}

export default function CheckoutForm({return_url}: CheckoutFormProps) {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(searchParams).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          messageApi.success("Payment success");
          router.push("/");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit} className="text-center">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button
        disabled={!stripe || !elements}
        loading={isLoading}
        style={{
          marginTop: "20px"
        }}
        onClick={handleSubmit}
      >
        Buy Now
      </Button>
      {!!message && <div id="payment-message">{message}</div>}
    </form>
  );
}
