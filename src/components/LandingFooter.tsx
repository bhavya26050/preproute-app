'use client';

import Link from 'next/link';
import { useState } from 'react';

const footerLinks = [
  {
    title: 'Product',
    links: ['Feature-rich test creation', 'Question bank', 'Publishing', 'Analytics'],
  },
  {
    title: 'Roles',
    links: ['Admin portal', 'Student portal', 'Secure login', 'Role-based routing'],
  },
  {
    title: 'Resources',
    links: ['Docs', 'Walkthrough', 'Support', 'Privacy'],
  },
];

export default function LandingFooter() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <footer id="contact" className="border-t border-white/60 bg-gradient-to-b from-white/70 to-white/50 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="text-3xl font-semibold tracking-tight text-slate-900 transition-colors duration-300">Build assessment experiences that feel premium.</div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 transition-colors duration-300">
              Preproute brings a clean workflow for creating tests, managing questions, and routing users to the right experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/admin/login" className="group btn-primary inline-flex h-11 items-center rounded-full px-5 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(91,123,255,0.3)]">
                Start as Admin
              </Link>
              <Link href="/student/login" className="group inline-flex h-11 items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#18b981] hover:text-[#18b981] hover:shadow-[0_12px_25px_rgba(24,185,129,0.12)]">
                Start as Student
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title} className="transition-all duration-300">
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 transition-colors duration-300">{group.title}</div>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a 
                        onMouseEnter={() => setHoveredLink(link)}
                        onMouseLeave={() => setHoveredLink(null)}
                        className="relative transition-all duration-300 hover:text-[#5b7bff] cursor-pointer group inline-block" 
                        href="#"
                      >
                        {link}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#5b7bff] to-[#18b981] transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-slate-200/70 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between transition-all duration-300">
          <span className="transition-colors duration-300 hover:text-slate-700">© 2026 Preproute. Designed for modern test management.</span>
          <span className="transition-colors duration-300 hover:text-slate-700">Clean workflows. Distinct roles. Better publishing.</span>
        </div>
      </div>
    </footer>
  );
}
