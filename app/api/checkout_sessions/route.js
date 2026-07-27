import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { getUser } from '@/lib/api/user/user';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const amount = Number(formData.get('amount')) || 100;
        const headersList = await headers()
        const origin = headersList.get('origin')

        const {user} = await getUser();

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: user.email,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price_data: {
                        currency: "bdt",
                        product_data: {
                            name: "Blood Donation Fund",
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/funding/success?amount=${amount}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/funding`,
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}