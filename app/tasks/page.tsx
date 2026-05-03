'use client';
import { useState } from 'react';

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState<'basic' | 'premium'>('basic');

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">All Tasks</h1>
      <div className="flex bg-card-bg rounded-xl p-1 border border-gray-800 mb-6">
        <button onClick={() => setActiveTab('basic')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${activeTab === 'basic' ? 'bg-primary-purple text-white' : 'text-gray-400'}`}>Basic Tasks</button>
        <button onClick={() => setActiveTab('premium')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition flex justify-center items-center gap-1 ${activeTab === 'premium' ? 'bg-accent-gold text-gray-900' : 'text-gray-400'}`}>⭐ Premium</button>
      </div>

      <div className="flex flex-col gap-3">
        {activeTab === 'basic' ? (
          <div className="bg-card-bg rounded-xl p-4 border border-gray-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-xl">✈️</div>
               <div><p className="font-bold text-sm">Join Telegram Group</p><p className="text-accent-teal text-xs font-bold">+ ₦150</p></div>
            </div>
            <button className="bg-primary-purple text-white text-xs font-bold px-4 py-2 rounded-lg">Start</button>
          </div>
        ) : (
          <div className="bg-card-bg rounded-xl p-4 border border-accent-gold/30 flex justify-between items-center">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-accent-gold/20 rounded-lg flex items-center justify-center text-xl">📺</div>
               <div><p className="font-bold text-sm text-accent-gold">Watch Video</p><p className="text-accent-teal text-xs font-bold">+ ₦500</p></div>
            </div>
            <button className="bg-accent-gold text-gray-900 text-xs font-bold px-4 py-2 rounded-lg">Start</button>
          </div>
        )}
      </div>
    </main>
  );
}
