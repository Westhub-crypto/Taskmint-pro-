'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileSetup() {
  const router = useRouter();
  const [dbUser, setDbUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pin, setPin] = useState('');
  const [bankDetails, setBankDetails] = useState({ accountName: '', accountNumber: '', bankName: '' });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      if (window.Telegram.WebApp.initData) {
        fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData: window.Telegram.WebApp.initData })
        }).then(res => res.json()).then(data => {
          if (data.success) {
            setDbUser(data.user);
            if (data.user.bankDetails) setBankDetails(data.user.bankDetails);
          }
        });
      }
    }
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dbUser) return;
    if (pin && pin.length !== 4) return alert("PIN must be exactly 4 digits.");

    setIsLoading(true);
    try {
      const res = await fetch('/api/user/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: dbUser._id, pin: pin || undefined, bankDetails })
      });
      const data = await res.json();
      if (data.success) { alert("Profile updated successfully!"); setPin(''); } 
      else alert(data.message);
    } catch (err) { alert("Error saving profile."); } 
    finally { setIsLoading(false); }
  };

  return (
    <main className="p-4 flex flex-col gap-6 max-w-md mx-auto pb-24">
      <header className="flex items-center gap-4 mt-2">
        <button onClick={() => router.push('/')} className="w-10 h-10 bg-card-bg rounded-xl flex items-center justify-center border border-gray-800">←</button>
        <h1 className="text-xl font-bold">Security & Profile</h1>
      </header>

      <form onSubmit={handleSaveProfile} className="flex flex-col gap-6">
        <section className="bg-card-bg rounded-2xl p-5 border border-gray-800 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary-purple/20 rounded-full flex items-center justify-center text-primary-purple text-xl">🔒</div>
            <div><h2 className="font-bold">Withdrawal PIN</h2><p className="text-xs text-gray-400">Required for cashing out</p></div>
          </div>
          <input type="password" maxLength={4} placeholder="Enter 4-Digit PIN" className="w-full bg-app-bg border border-gray-700 rounded-xl px-4 py-3 text-center text-2xl tracking-[1em] focus:border-primary-purple focus:outline-none" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} />
        </section>

        <section className="bg-card-bg rounded-2xl p-5 border border-gray-800 shadow-xl">
          <h2 className="font-bold mb-4">Bank Details</h2>
          <div className="flex flex-col gap-4">
            <input type="text" placeholder="Account Name" className="w-full bg-app-bg border border-gray-700 rounded-xl px-4 py-3 text-sm focus:border-primary-purple focus:outline-none" value={bankDetails.accountName} onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})} />
            <input type="text" placeholder="Bank Name" className="w-full bg-app-bg border border-gray-700 rounded-xl px-4 py-3 text-sm focus:border-primary-purple focus:outline-none" value={bankDetails.bankName} onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})} />
            <input type="text" maxLength={10} placeholder="Account Number" className="w-full bg-app-bg border border-gray-700 rounded-xl px-4 py-3 text-sm focus:border-primary-purple focus:outline-none" value={bankDetails.accountNumber} onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value.replace(/\D/g, '')})} />
          </div>
        </section>

        <button type="submit" disabled={isLoading} className="w-full bg-primary-purple text-white font-bold py-4 rounded-xl mt-2 hover:bg-opacity-90 disabled:opacity-50">
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  );
}
