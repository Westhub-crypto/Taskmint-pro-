export default function SupportPage() {
  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-6">Help & Support</h1>
      <div className="bg-card-bg rounded-2xl p-6 border border-gray-800 text-center mb-6">
        <div className="w-16 h-16 bg-primary-purple/20 rounded-full flex items-center justify-center text-primary-purple text-3xl mx-auto mb-4">🎧</div>
        <h2 className="font-bold text-lg mb-2">Need Help?</h2>
        <p className="text-sm text-gray-400 mb-6">Our support team is available 24/7 to assist you.</p>
        <a href="https://t.me/your_support_username" target="_blank" rel="noopener noreferrer" className="block w-full bg-primary-purple text-white font-bold py-3 rounded-xl hover:bg-opacity-90">Contact Admin</a>
      </div>
    </main>
  );
}
