'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [newTask, setNewTask] = useState({ title: '', type: 'telegram_join', category: 'basic', rewardAmount: 100, targetChatId: '', actionUrl: '' });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user?.id.toString() === '8067627422') {
        setIsAdmin(true);
        fetchStats('8067627422');
      } else router.push('/');
    }
  }, [router]);

  const fetchStats = async (adminId: string) => {
    const res = await fetch('/api/admin/stats', { method: 'POST', body: JSON.stringify({ adminTelegramId: adminId }) });
    const data = await res.json();
    if (data.success) setStats(data.stats);
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/tasks', { method: 'POST', body: JSON.stringify({ adminTelegramId: '8067627422', taskData: newTask }) });
    if ((await res.json()).success) { alert('Task Created!'); fetchStats('8067627422'); }
  };

  if (!isAdmin) return <div className="p-10 text-center text-gray-400">Verifying Admin Access...</div>;

  return (
    <div className="min-h-screen bg-app-bg text-white p-4 md:p-8 flex flex-col md:flex-row gap-6">
      <aside className="w-full md:w-64 bg-card-bg rounded-2xl p-5 border border-gray-800 h-fit">
        
        <div className="mb-8 flex justify-center">
          <Image src="/logo.jpg" alt="TaskMint Logo" width={120} height={40} className="object-contain rounded-xl" />
        </div>

        <h2 className="font-bold mb-4 flex items-center gap-2"><span className="text-xl">🛡️</span> Super Admin</h2>
        <nav className="flex flex-col gap-2">
          <button onClick={() => setActiveTab('overview')} className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === 'overview' ? 'bg-primary-purple text-white' : 'text-gray-400'}`}>📊 Dashboard</button>
          <button onClick={() => setActiveTab('tasks')} className={`text-left px-4 py-3 rounded-xl text-sm font-semibold transition ${activeTab === 'tasks' ? 'bg-primary-purple text-white' : 'text-gray-400'}`}>📋 Manage Tasks</button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col gap-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card-bg rounded-2xl p-5 border border-gray-800"><p className="text-sm">Total Users</p><h3 className="text-3xl font-bold">{stats?.totalUsers || 0}</h3></div>
            <div className="bg-card-bg rounded-2xl p-5 border border-gray-800"><p className="text-sm">Premium Users</p><h3 className="text-3xl font-bold text-accent-gold">{stats?.premiumUsers || 0}</h3></div>
            <div className="bg-card-bg rounded-2xl p-5 border border-gray-800"><p className="text-sm">Liability</p><h3 className="text-3xl font-bold text-accent-teal">₦{stats?.totalNgnLiability?.toLocaleString() || 0}</h3></div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-card-bg rounded-2xl p-6 border border-gray-800">
            <h2 className="text-xl font-bold mb-6">Create New Task</h2>
            <form onSubmit={handleCreateTask} className="flex flex-col gap-4 max-w-lg">
              <input required placeholder="Task Title" className="bg-app-bg border border-gray-700 rounded-lg p-3" onChange={e => setNewTask({...newTask, title: e.target.value})} />
              <input required type="number" placeholder="Reward (₦)" className="bg-app-bg border border-gray-700 rounded-lg p-3" onChange={e => setNewTask({...newTask, rewardAmount: Number(e.target.value)})} />
              <input required placeholder="Target Chat ID (@group)" className="bg-app-bg border border-gray-700 rounded-lg p-3" onChange={e => setNewTask({...newTask, targetChatId: e.target.value})} />
              <input required placeholder="Action URL" className="bg-app-bg border border-gray-700 rounded-lg p-3" onChange={e => setNewTask({...newTask, actionUrl: e.target.value})} />
              <button type="submit" className="bg-primary-purple text-white py-3 rounded-xl mt-4">Create Task</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
