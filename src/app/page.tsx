import Link from 'next/link';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';

const highlights = [
  {
    title: 'Beautifully guided creation',
    description: 'Create tests with a clean, step-by-step flow built for speed and clarity.',
  },
  {
    title: 'Role-based entry',
    description: 'Send admins and students to the right experience without any confusion.',
  },
  {
    title: 'Modern publishing workflow',
    description: 'Preview, polish, and publish with a simple interface and smart feedback.',
  },
];

const metrics = [
  { value: '5', label: 'Core screens in one flow' },
  { value: '60%', label: 'Less friction in test setup' },
  { value: '100%', label: 'Responsive across devices' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <LandingHeader />

      <section className="relative min-h-[100vh] px-6 py-8 sm:px-8 lg:px-10">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(91,123,255,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(24,185,129,0.12),_transparent_28%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)]" />
        <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-[#5b7bff]/10 blur-3xl animate-[float_14s_ease-in-out_infinite]" />
        <div className="absolute right-10 top-24 h-64 w-64 rounded-full bg-[#18b981]/10 blur-3xl animate-[float_16s_ease-in-out_infinite]" />

        <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-2xl pt-8 lg:pt-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur animate-[fadeUp_0.8s_ease-out]">
              <span className="h-2 w-2 rounded-full bg-[#5b7bff]" />
              Modern test management for teams and learners
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl animate-[fadeUp_0.9s_ease-out]">
              Build, publish, and monitor assessments with clarity.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 animate-[fadeUp_1s_ease-out]">
              Preproute is a modern assessment workspace with dedicated paths for admins and students. Create tests,
              add MCQs, preview content, and publish with a workflow that feels fast and calm.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row animate-[fadeUp_1.05s_ease-out]">
              <Link href="/admin/login" className="btn-primary inline-flex h-12 items-center justify-center rounded-full px-6 text-base shadow-[0_20px_40px_rgba(91,123,255,0.25)] transition hover:-translate-y-0.5">
                Admin Portal
              </Link>
              <Link href="/student/login" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-base font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300">
                Student Portal
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3 animate-[fadeUp_1.1s_ease-out]">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
                  <div className="text-3xl font-semibold tracking-tight text-slate-900">{metric.value}</div>
                  <div className="mt-1 text-sm leading-6 text-slate-500">{metric.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-slate-500 animate-[fadeUp_1.15s_ease-out]">
              <div className="flex -space-x-2">
                <span className="h-10 w-10 rounded-full border-2 border-white bg-[#5b7bff]" />
                <span className="h-10 w-10 rounded-full border-2 border-white bg-[#18b981]" />
                <span className="h-10 w-10 rounded-full border-2 border-white bg-[#0f172a]" />
              </div>
              <div>
                <div className="font-medium text-slate-700">Trusted by test teams and learning ops</div>
                <div>Designed to route admins and students without friction.</div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[560px] items-center justify-center lg:justify-end">
            <div className="relative h-[560px] w-full max-w-[540px] animate-[float_10s_ease-in-out_infinite]">
              <div className="absolute inset-x-8 top-10 h-[400px] rounded-[36px] border border-white/80 bg-white/75 shadow-[0_40px_120px_rgba(15,23,42,0.12)] backdrop-blur" />
              <div className="absolute left-14 top-20 h-24 w-24 rounded-full bg-[#5b7bff]/20 blur-2xl" />
              <div className="absolute right-20 top-24 h-20 w-20 rounded-full bg-[#18b981]/20 blur-2xl" />

              <div className="absolute left-16 top-18 rounded-3xl border border-slate-100 bg-white px-5 py-4 shadow-lg">
                <div className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-slate-400">Live preview</div>
                <div className="text-lg font-semibold text-slate-900">Create test in minutes</div>
                <div className="mt-3 h-2 w-40 rounded-full bg-slate-100">
                  <div className="h-2 w-24 rounded-full bg-[#5b7bff]" />
                </div>
              </div>

              <div className="absolute right-14 top-44 rounded-[28px] bg-[#0f172a] px-6 py-5 text-white shadow-[0_30px_60px_rgba(15,23,42,0.18)]">
                <div className="text-sm text-slate-300">Questions</div>
                <div className="mt-1 text-4xl font-semibold">50+</div>
                <div className="mt-3 text-sm text-slate-300">drag, drop, and publish</div>
              </div>

              <div className="absolute bottom-14 left-24 right-24 rounded-[34px] bg-gradient-to-br from-[#5b7bff] to-[#3557e5] px-6 py-5 text-white shadow-[0_24px_60px_rgba(91,123,255,0.38)]">
                <div className="flex items-center justify-between text-sm text-white/80">
                  <span>Publishing flow</span>
                  <span>95% completed</span>
                </div>
                <div className="mt-3 h-3 rounded-full bg-white/20">
                  <div className="h-3 w-[95%] rounded-full bg-white" />
                </div>
              </div>

              <div className="absolute bottom-0 left-10 right-10 h-4 rounded-full bg-slate-700/25" />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto grid w-full max-w-7xl gap-6 px-6 pb-20 sm:px-8 lg:grid-cols-3 lg:px-10">
        {highlights.map((item, index) => (
          <article
            key={item.title}
            className="group rounded-[28px] border border-white/70 bg-white/75 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(15,23,42,0.12)] animate-[fadeUp_1.1s_ease-out]"
            style={{ animationDelay: `${index * 120}ms` }}
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef4ff] text-xl font-semibold text-[#4b67f0] transition group-hover:bg-[#5b7bff] group-hover:text-white">
              0{index + 1}
            </div>
            <h2 className="text-xl font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">{item.description}</p>
          </article>
        ))}
      </section>

      <section id="workflow" className="mx-auto w-full max-w-7xl px-6 pb-20 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[30px] border border-white/70 bg-white/75 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Workflow</div>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">A guided flow from login to publish.</h2>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Route the right people into the right portal, create tests, draft questions, preview the result, and publish with confidence.
            </p>

            <div className="mt-8 space-y-4">
              {['Login by role', 'Create test structure', 'Add MCQs & options', 'Preview and publish'].map((step, index) => (
                <div key={step} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef4ff] font-semibold text-[#4b67f0]">
                    0{index + 1}
                  </div>
                  <div className="font-medium text-slate-700">{step}</div>
                </div>
              ))}
            </div>
          </div>

          <div id="roles" className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: 'Admins',
                subtitle: 'Test creation hub',
                href: '/admin/login',
                accent: 'from-[#5b7bff] to-[#3557e5]',
              },
              {
                title: 'Students',
                subtitle: 'Assessment entry point',
                href: '/student/login',
                accent: 'from-[#18b981] to-[#0ea5a5]',
              },
            ].map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur transition duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${card.accent}`} />
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white transition group-hover:scale-105">
                  {card.title.charAt(0)}
                </div>
                <div className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">{card.subtitle}</div>
                <div className="mt-3 text-2xl font-semibold text-slate-900">{card.title}</div>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {card.title === 'Admins'
                    ? 'Create and publish assessments with questions, topics, and marking schemes in a polished workspace.'
                    : 'Enter assessments through a clean, distraction-free layout designed for focus.'}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#5b7bff]">
                  Open portal
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}