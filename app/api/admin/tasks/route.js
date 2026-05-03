import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Task from '@/lib/models/Task';

export async function POST(req) {
  try {
    await dbConnect();
    const { adminTelegramId, taskData } = await req.json();
    if (adminTelegramId !== '8067627422') return NextResponse.json({ success: false }, { status: 403 });

    const newTask = await Task.create(taskData);
    return NextResponse.json({ success: true, task: newTask });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
