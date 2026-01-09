import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = "re_UtgUh23G_8DdD8qFVt5bcDZjm9mGEiCWb"

serve(async (req) => {
  const { record } = await req.json() // This is the new order from Supabase

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Gayatri Store <onboarding@resend.dev>",
      to: ["your-email@gmail.com"], // Your actual email
      subject: `New Order Received: ${record.order_id}`,
      html: `
        <h1>New Order Alert!</h1>
        <p><strong>Order ID:</strong> ${record.order_id}</p>
        <p><strong>Customer:</strong> ${record.customer_name}</p>
        <p><strong>Items:</strong> ${record.items}</p>
        <p><strong>Total:</strong> ₹${record.total}</p>
        <p><strong>Address:</strong> ${record.address_line}, ${record.pincode}</p>
      `,
    }),
  })

  return new Response(JSON.stringify({ done: true }), { headers: { "Content-Type": "application/json" } })
})
