import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import Task from '@/lib/models/Task';

export async function POST(req) {
  try {
    await dbConnect();
    if ((await req.json()).adminTelegramId !== '8067627422') return NextResponse.json({ success: false }, { status: 403 });

    const [totalUsers, premiumUsers, totalTasks, users] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isPremium: true }),
      Task.countDocuments(),
      User.find({}, 'balances')
    ]);

    const totalNgnLiability = users.reduce((acc, u) => acc + (u.balances?.ngn || 0), 0);
    return NextResponse.json({ success: true, stats: { totalUsers, premiumUsers, totalTasks, totalNgnLiability } });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
