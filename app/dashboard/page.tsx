export default function DashboardPage() {
  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-6">Dashboard</h1>
      <section className="bg-card-bg rounded-2xl p-5 border border-gray-800 mb-6">
        <p className="text-gray-400 text-sm mb-1">Total Earned</p>
        <h2 className="text-3xl font-bold text-accent-teal mb-4">₦0.00</h2>
        <div className="flex justify-between text-sm"><span className="text-gray-400">Tasks Completed</span><span className="font-bold">0</span></div>
      </section>

      <section>
        <h2 className="font-bold mb-4">Recent Transactions</h2>
        <p className="text-sm text-gray-500 text-center py-6">No recent transactions yet.</p>
      </section>
    </main>
  );
}
