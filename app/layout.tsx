import Script from 'next/script';
import './globals.css';
import BottomNav from '@/components/BottomNav';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className="bg-app-bg text-white font-sans antialiased min-h-screen pb-20">
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
