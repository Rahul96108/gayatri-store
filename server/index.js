// import express from 'express';
// import cors from 'cors';

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get('/api/status', (req, res) => {
//   res.json({ message: "Gayatri Namkeen API is Online", version: "1.0.0" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));


const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/orders', (req, res) => {
  const { name, email, items, total, address, pincode, state } = req.body;

  // 1. Generate a unique Order Number
  const orderId = "GAY-" + Math.floor(100000 + Math.random() * 900000);

  // 2. Logic to Save to Database (e.g., MongoDB or Supabase)
  console.log(`Order ${orderId} saved for ${name}`);

  // 3. Logic to send Email (Mocked here)
  console.log(`Sending confirmation email to ${email}...`);
  // Here you would use something like:
  // transporter.sendMail({ to: email, subject: 'Order Confirmed', text: ... });

  res.json({
    success: true,
    orderId: orderId,
    message: "Order placed successfully"
  });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
