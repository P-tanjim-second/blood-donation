// Server component — no "use client", no hooks
import { stripe } from "@/lib/stripe";
import SuccessView from "./SuccessView";
import { serverUpdate } from "@/lib/api/core/core";
import { getUser } from "@/lib/api/user/user";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Payment Successful | Vitae",
  description: "Your contribution to Vitae has been confirmed.",
};

// In Next.js 15 the searchParams prop is a Promise — must be awaited
export default async function FundingSuccessPage({ searchParams }) {
  const params = await searchParams;
  const { session_id } = params;
  const amount = params.amount ? Number(params.amount) : null;
  const session = await getUser();

  if (!session?.user) {
    redirect('/login')
  }
  const name = session?.user?.name || "Anonymous";

  const date = new Date().toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  try {
    const {
      status,
      customer_details,
    } = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent']
    });


    const donorName = session?.user?.name || customer_details?.name || name;
    const donorEmail = session?.user?.email || customer_details?.email || "";

    if (status == "complete") {
      await serverUpdate('/funder', {
        email: donorEmail,
        name: donorName,
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
  } catch {
    redirect('/funding')
  }


}