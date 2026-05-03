import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req) {
  try {
    const { initData } = await req.json();
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    urlParams.delete('hash');
    
    const dataCheckString = Array.from(urlParams.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `${key}=${value}`).join('\n');

    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
    const calculatedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (calculatedHash === hash) {
      const tgUser = JSON.parse(urlParams.get('user'));
      await dbConnect();
      
      let user = await User.findOne({ telegramId: tgUser.id.toString() });
      if (!user) {
        user = await User.create({
          telegramId: tgUser.id.toString(),
          username: tgUser.username || '',
          firstName: tgUser.first_name || 'User',
          referralCode: `TM-${tgUser.id}`
        });
      }
      return NextResponse.json({ success: true, user });
    }
    return NextResponse.json({ success: false, message: 'Invalid Data' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}
