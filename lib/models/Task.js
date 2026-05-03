import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: ['video', 'telegram_join', 'social', 'link', 'custom'], required: true },
  category: { type: String, enum: ['basic', 'premium'], required: true },
  rewardAmount: { type: Number, required: true },
  currency: { type: String, enum: ['ngn', 'usd'], default: 'ngn' },
  verificationType: { type: String, enum: ['manual', 'telegram_chat', 'timer'], default: 'manual' },
  targetChatId: { type: String }, 
  timerSeconds: { type: Number, default: 0 },
  actionUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', taskSchema);
