import { NextResponse } from 'next/server';
import axios from 'axios';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import Task from '@/lib/models/Task';

export async function POST(req) {
  try {
    await dbConnect();
    const { userId, taskId } = await req.json();
    const user = await User.findById(userId);
    const task = await Task.findById(taskId);

    if (!user || !task) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    if (user.completedTasks.includes(taskId)) return NextResponse.json({ success: false, message: 'Already completed' }, { status: 400 });

    if (task.verificationType === 'telegram_chat') {
      try {
        const tgResponse = await axios.get(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getChatMember`, {
          params: { chat_id: task.targetChatId, user_id: user.telegramId }
        });
        if (!['member', 'administrator', 'creator'].includes(tgResponse.data.result.status)) {
          return NextResponse.json({ success: false, message: 'Channel not joined!' }, { status: 400 });
        }
      } catch (err) {
        return NextResponse.json({ success: false, message: 'Verification failed.' }, { status: 500 });
      }
    }

    task.currency === 'ngn' ? user.balances.ngn += task.rewardAmount : user.balances.usd += task.rewardAmount;
    user.completedTasks.push(taskId);
    await user.save();

    return NextResponse.json({ success: true, message: 'Task verified!', newBalance: user.balances });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
