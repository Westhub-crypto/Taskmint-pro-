'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [tgUser, setTgUser] = useState<any>(null);
  const [dbUser, setDbUser] = useState<any>(null);
  const [currency, setCurrency] = useState<'NGN' | 'USD'>('NGN');
  const [balances, setBalances] = useState({ NGN: 0, USD: 0 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      setTgUser(tg.initDataUnsafe?.user);

      if (tg.initData) {
        fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData: tg.initData })
        }).then(res => res.json()).then(data => {
          if (data.success) {
            setDbUser(data.user);
            setBalances({ NGN: data.user.balances.ngn, USD: data.user.balances.usd });
          }
        });
      }
    }
  }, []);

  return (
    <main className="p-4 flex flex-col gap-6 max-w-md mx-auto">
      
      <div className="flex justify-center mt-2 mb-2">
        <Image 
          src="/logo.jpg" 
          alt="TaskMint Pro" 
          width={160} 
          height={60} 
          className="object-contain drop-shadow-lg rounded-2xl"
          priority
        />
      </div>

      <header className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/profile')} className="w-10 h-10 bg-card-bg rounded-full border border-gray-800 flex items-center justify-center hover:border-primary-purple">
             <span className="text-gray-400 text-sm">{tgUser?.first_name?.charAt(0) || 'U'}</span>
          </button>
          <div>
            <p className="text-xs text-gray-400">Hello,</p>
            <h1 className="text-sm font-bold flex items-center gap-1">
              {tgUser?.first_name || 'User'} 
              {dbUser?.isPremium && <span className="bg-primary-purple/20 text-primary-purple text-[10px] px-2 py-0.5 rounded-full ml-2">⭐ Pro</span>}
            </h1>
          </div>
        </div>
        <button onClick={() => setCurrency(currency === 'NGN' ? 'USD' : 'NGN')} className="bg-card-bg px-3 py-1.5 rounded-lg text-xs font-semibold border border-gray-800 flex gap-2">
          <span className={currency === 'NGN' ? 'text-accent-teal' : 'text-gray-500'}>NGN</span>
          <span className={currency === 'USD' ? 'text-accent-teal' : 'text-gray-500'}>USD</span>
        </button>
      </header>

      <section className="bg-card-bg rounded-2xl p-5 border border-gray-800 shadow-xl">
        <p className="text-gray-400 text-sm mb-2">Wallet Balance</p>
        <h2 className="text-3xl font-extrabold mb-6">{currency === 'NGN' ? '₦' : '$'}{balances[currency].toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
        <div className="flex gap-4">
          <button className="flex-1 bg-primary-purple text-white text-sm font-semibold py-3 rounded-xl hover:bg-opacity-90">Deposit</button>
          <button className="flex-1 bg-app-bg text-white text-sm font-semibold py-3 rounded-xl border border-gray-700">Withdraw</button>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card-bg rounded-xl p-3 border border-gray-800"><p className="text-[10px] text-gray-400">Tasks Completed</p><p className="font-bold text-sm">{dbUser?.completedTasks?.length || 0}</p></div>
        <div className="bg-card-bg rounded-xl p-3 border border-gray-800"><p className="text-[10px] text-gray-400">Total Earned</p><p className="font-bold text-sm">₦{balances.NGN}</p></div>
      </div>
    </main>
  );
}
