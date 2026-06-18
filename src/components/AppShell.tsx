"use client";

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/tests');
  const isLanding = pathname === '/';
  const isAuth = pathname.startsWith('/login') || pathname.startsWith('/admin/login') || pathname.startsWith('/student/login');

  if (!isAppRoute || isLanding || isAuth) {
    return <>{children}</>;
  }

  return (
    <div className="h-full grid grid-cols-[240px_1fr]">
      <Sidebar />
      <div className="flex flex-col h-full">
        <Topbar />
        <main className="flex-1 overflow-auto bg-[color:var(--bg)]">
          <div className="max-w-[1100px] mx-auto p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
