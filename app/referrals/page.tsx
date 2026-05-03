'use client';
import { useState, useEffect } from 'react';

export default function ReferralPage() {
  const [referralLink, setReferralLink] = useState('Loading...');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user) setReferralLink(`https://t.me/TaskMintPro_Bot?start=ref_${user.id}`);
    }
  }, []);

  const handleCopy = () => { navigator.clipboard.writeText(referralLink); alert('Copied!'); };

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-6">Refer & Earn</h1>
      <section className="bg-primary-purple/10 rounded-2xl p-5 border border-primary-purple/30 mb-6">
        <h2 className="text-sm text-primary-purple font-bold mb-2">Your Referral Link</h2>
        <div className="flex gap-2">
          <input type="text" readOnly value={referralLink} className="flex-1 bg-app-bg border border-primary-purple/50 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none" />
          <button onClick={handleCopy} className="bg-primary-purple text-white px-4 py-2 rounded-xl text-xs font-bold">Copy</button>
        </div>
      </section>
      <section className="bg-card-bg rounded-2xl p-5 border border-gray-800">
        <h2 className="font-bold mb-4">Referral Stats</h2>
        <div className="flex justify-between border-b border-gray-800 pb-3 mb-3"><span className="text-gray-400 text-sm">Total Referrals</span><span className="font-bold">0</span></div>
        <div className="flex justify-between"><span className="text-gray-400 text-sm">Referral Earnings</span><span className="font-bold text-accent-gold">₦0</span></div>
      </section>
    </main>
  );
}
