import Link from 'next/link';

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
  return (
    <footer id="contact" className="border-t border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="text-3xl font-semibold tracking-tight text-slate-900">Build assessment experiences that feel premium.</div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
              Preproute brings a clean workflow for creating tests, managing questions, and routing users to the right experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/admin/login" className="btn-primary inline-flex h-11 items-center rounded-full px-5 text-sm">
                Start as Admin
              </Link>
              <Link href="/student/login" className="inline-flex h-11 items-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 shadow-sm">
                Start as Student
              </Link>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{group.title}</div>
                <ul className="mt-4 space-y-3 text-sm text-slate-600">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a className="transition hover:text-slate-900" href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-slate-200/70 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Preproute. Designed for modern test management.</span>
          <span>Clean workflows. Distinct roles. Better publishing.</span>
        </div>
      </div>
    </footer>
  );
}
