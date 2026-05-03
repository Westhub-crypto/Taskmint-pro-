'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();
  if (pathname === '/admin') return null;

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Tasks', path: '/tasks', icon: '📋' },
    { name: 'Refer', path: '/referrals', icon: '👥' },
    { name: 'Profile', path: '/profile', icon: '👤' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-app-bg border-t border-gray-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link href={item.path} key={item.name} className="flex flex-col items-center justify-center w-full h-full">
              <span className={`text-xl mb-1 ${isActive ? 'text-primary-purple' : 'text-gray-500 opacity-50'}`}>{item.icon}</span>
              <span className={`text-[10px] ${isActive ? 'text-primary-purple font-bold' : 'text-gray-500'}`}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
