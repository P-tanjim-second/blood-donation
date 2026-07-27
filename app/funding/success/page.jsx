// Server component — no "use client", no hooks
import { stripe } from "@/lib/stripe";
import SuccessView from "./SuccessView";

export const metadata = {
  title: "Payment Successful | Vitae",
  description: "Your contribution to Vitae has been confirmed.",
};

// In Next.js 15 the searchParams prop is a Promise — must be awaited
export default async function FundingSuccessPage({ searchParams }) {
  const params = await searchParams;
  const {session_id} = await searchParams;

  const {
        status,
        customer_details,
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    console.log(status, customer_details)

  // Stripe appends these automatically to your return_url
  const paymentIntent  = status;
  const redirectStatus = params.redirect_status ?? "succeeded";

  // Your app appends ?amount=500 to the return_url before passing to Stripe
  const amount = params.amount ? Number(params.amount) : null;

  // Date formatted on the server — no hydration mismatch on client
  const date = new Date().toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <SuccessView
      paymentIntent={paymentIntent}
      redirectStatus={redirectStatus}
      amount={amount}
      date={date}
    />
  );
}