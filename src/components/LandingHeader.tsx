import Link from 'next/link';

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Roles', href: '#roles' },
  { label: 'Contact', href: '#contact' },
];

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5b7bff] text-lg font-semibold text-white shadow-lg shadow-blue-200">
            P
          </div>
          <div>
            <div className="text-xl font-bold tracking-tight text-[#3563eb]">Preproute</div>
            <div className="text-xs text-slate-400">Modern assessment OS</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/student/login"
            className="hidden h-11 items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 sm:inline-flex"
          >
            Student
          </Link>
          <Link
            href="/admin/login"
            className="inline-flex h-11 items-center rounded-full bg-[#5b7bff] px-5 text-sm font-medium text-white shadow-[0_18px_40px_rgba(91,123,255,0.28)] transition hover:-translate-y-0.5 hover:bg-[#4b67f0]"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </header>
  );
}
