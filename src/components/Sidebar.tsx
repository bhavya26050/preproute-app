"use client";
import Link from 'next/link';
import React from 'react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '↗' },
  { href: '/tests/new', label: 'Test Creation', icon: '✎' },
  { href: '/dashboard', label: 'Test Tracking', icon: '▣' },
];

const utilityIcons = ['↗', '✎', '◌', '▣', '◫', '◔', '⚑', '☰', '⌁'];

export default function Sidebar(){
  return (
    <aside className="h-full border-r border-slate-200 bg-white" aria-label="Sidebar">
      <div className="flex h-full">
        <div className="flex w-16 flex-col items-center border-r border-slate-100 py-4 text-slate-400">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4ff] text-[#4b67f0] shadow-sm">
            P
          </div>
          <div className="flex flex-1 flex-col items-center gap-4 py-4">
            {utilityIcons.map((icon, index) => (
              <button
                key={icon + index}
                className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs transition ${index === 1 ? 'bg-[#eef4ff] text-[#4b67f0] shadow-sm' : 'hover:bg-slate-100 hover:text-slate-700'}`}
                aria-label={`utility-${index}`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div className="flex w-[176px] flex-col">
          <div className="px-4 py-5">
            <div className="text-[22px] font-bold leading-none tracking-tight text-[#3563eb]">Preproute</div>
          </div>

          <nav className="px-3 pb-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${index === 1 ? 'border border-[#dbe6ff] bg-[#f5f8ff] text-[#3563eb]' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white text-sm shadow-sm">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto px-4 pb-5">
            <div className="rounded-2xl border border-slate-100 bg-gradient-to-br from-[#f7fbff] to-white p-4 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Workspace</div>
              <div className="mt-2 text-sm font-medium text-slate-800">Chapter Wise</div>
              <div className="mt-1 text-xs leading-5 text-slate-500">Admin tools for test creation and publishing.</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
