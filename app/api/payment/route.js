import { NextResponse } from 'next/server';
import axios from 'axios';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req) {
  try {
    await dbConnect();
    const { amount, email, userId } = await req.json();
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

    const payload = {
      amount: amount * 100, 
      email: email,
      currency: "NGN",
      initiate_type: "inline",
      transaction_ref: `TASKMINT-${userId}-${Date.now()}`,
      callback_url: "https://your-domain.com/payment/callback"
    };

    const response = await axios.post(`https://api-a.squadco.com/transaction/initiate`, payload, {
      headers: { 'Authorization': `Bearer ${process.env.SQUADCO_SECRET_KEY}` }
    });
    return NextResponse.json({ success: true, data: response.data.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Payment failed' }, { status: 500 });
  }
}
