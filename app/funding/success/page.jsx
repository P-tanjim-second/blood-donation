// Server component — no "use client", no hooks
import { stripe } from "@/lib/stripe";
import SuccessView from "./SuccessView";
import { serverUpdate } from "@/lib/api/core/core";
import { getUser } from "@/lib/api/user/user";

export const metadata = {
  title: "Payment Successful | Vitae",
  description: "Your contribution to Vitae has been confirmed.",
};

// In Next.js 15 the searchParams prop is a Promise — must be awaited
export default async function FundingSuccessPage({ searchParams }) {
  const params = await searchParams;
  const { session_id } = await searchParams;
  const amount = params.amount ? Number(params.amount) : null;
  const { user } = await getUser();
  const name = user.name;

  const date = new Date().toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  const {
    status,
    customer_details,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  if (status == "complete") {
    await serverUpdate('/funder', {
      email: customer_details.email,
      name: name,
      amount: amount,
      date: date
    })

    await serverUpdate('/total_funding', { amount: amount }, 'PATCH')
  }

  // Stripe appends these automatically to your return_url
  const paymentIntent = status;
  const redirectStatus = params.redirect_status ?? "succeeded";

  // Your app appends ?amount=500 to the return_url before passing to Stripe


  // Date formatted on the server — no hydration mismatch on client


  return (
    <SuccessView
      paymentIntent={paymentIntent}
      redirectStatus={redirectStatus}
      amount={amount}
      date={date}
    />
  );
}