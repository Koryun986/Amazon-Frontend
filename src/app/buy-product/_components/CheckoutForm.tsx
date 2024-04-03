"use client"
import {useState} from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {Button} from "antd";
import {useSearchParams} from "next/navigation";

export default function CheckoutForm() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    const id = Number.parseInt(searchParams.get("id") || "");
    const count = Number.parseInt(searchParams.get("count") || "");
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/buy-product/action?id=${id}&count=${count}`,
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