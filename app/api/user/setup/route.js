import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(req) {
  try {
    await dbConnect();
    const { userId, pin, bankDetails } = await req.json();
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

    if (pin) {
      if (pin.length !== 4 || isNaN(pin)) return NextResponse.json({ success: false, message: 'Invalid PIN' }, { status: 400 });
      const salt = await bcrypt.genSalt(10);
      user.pin = await bcrypt.hash(pin, salt);
    }

    if (bankDetails) {
      user.bankDetails = {
        accountName: bankDetails.accountName || user.bankDetails?.accountName,
        accountNumber: bankDetails.accountNumber || user.bankDetails?.accountNumber,
        bankName: bankDetails.bankName || user.bankDetails?.bankName,
      };
    }
    await user.save();
    return NextResponse.json({ success: true, message: 'Profile secured successfully!' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update profile' }, { status: 500 });
  }
}
