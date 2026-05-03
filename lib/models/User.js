import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  firstName: { type: String },
  role: { type: String, enum: ['user', 'admin', 'superadmin'], default: 'user' },
  balances: {
    ngn: { type: Number, default: 0 },
    usd: { type: Number, default: 0 }
  },
  isPremium: { type: Boolean, default: false },
  pin: { type: String },
  bankDetails: {
    accountName: String,
    accountNumber: String,
    bankName: String
  },
  completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  referralCode: { type: String, unique: true },
  dailyLoginStamp: { type: Date }
}, { timestamps: true });

userSchema.pre('save', function(next) {
  if (this.telegramId === '8067627422') this.role = 'superadmin';
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);
