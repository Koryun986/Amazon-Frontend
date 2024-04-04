"use client"
import {useState} from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {Button} from "antd";
import {useSearchParams} from "next/navigation";

interface CheckoutFormProps {
  return_url: string;
}

export default function CheckoutForm({return_url}: CheckoutFormProps) {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

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