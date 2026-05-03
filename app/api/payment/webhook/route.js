import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-squad-signature');
    const secret = process.env.SQUADCO_SECRET_KEY;

    if (!signature) return NextResponse.json({ success: false }, { status: 400 });

    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex').toUpperCase();
    if (hash.toLowerCase() !== signature.toLowerCase()) return NextResponse.json({ success: false }, { status: 401 });

    const event = JSON.parse(rawBody);
    if (event.Event === 'charge.completed' || event.Event === 'charge.successful') {
      const userId = event.Body.transaction_ref.split('-')[1];
      if (userId) {
        await dbConnect();
        const user = await User.findById(userId);
        if (user && !user.isPremium) {
          user.isPremium = true;
          await user.save();
        }
      }
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
