'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Roles', href: '#roles' },
  { label: 'Contact', href: '#contact' },
];

export default function LandingHeader() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/60 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="group flex items-center gap-3 transition-transform duration-300 hover:scale-105">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#5b7bff] to-[#3557e5] text-lg font-semibold text-white shadow-lg shadow-blue-200 transition-all duration-300 group-hover:shadow-blue-400">
            P
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#5b7bff] to-[#3563eb] bg-clip-text text-transparent transition-all duration-300">Preproute</div>
            <div className="text-xs text-slate-400 transition-colors duration-300 group-hover:text-slate-500">Modern assessment OS</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredNav(item.label)}
              onMouseLeave={() => setHoveredNav(null)}
              className="text-sm font-medium text-slate-600 transition-all duration-300 hover:text-slate-900 relative"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5b7bff] to-[#18b981] scale-x-0 transform origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/student/login"
            className="group hidden h-11 items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#18b981] hover:text-[#18b981] hover:shadow-[0_12px_25px_rgba(24,185,129,0.12)] sm:inline-flex"
          >
            Student
          </Link>
          <Link
            href="/admin/login"
            className="group inline-flex h-11 items-center rounded-full bg-gradient-to-r from-[#5b7bff] to-[#4b67f0] px-5 text-sm font-medium text-white shadow-[0_18px_40px_rgba(91,123,255,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_rgba(91,123,255,0.38)]"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
}
