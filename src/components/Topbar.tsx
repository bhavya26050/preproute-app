"use client";
import React from 'react';

export default function Topbar(){
  return (
    <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="text-sm text-slate-400">Test Creation / Create Test / Chapter Wise</div>
      <div className="flex items-center gap-4">
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:-translate-y-0.5 hover:text-slate-800">
          🔔
        </button>
        <div className="flex items-center gap-3 rounded-full border border-slate-100 bg-white px-2 py-1 pr-4 shadow-sm">
          <img src="/avatar.png" alt="avatar" className="h-10 w-10 rounded-full" />
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-800">Alex Wando</div>
            <div className="text-xs text-slate-400">Admin</div>
          </div>
          <span className="text-slate-400">▾</span>
        </div>
      </div>
    </div>
  );
}
