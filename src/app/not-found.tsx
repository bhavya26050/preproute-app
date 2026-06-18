import Link from 'next/link';

const floatingBoxes = [
  'top-10 left-10',
  'top-24 right-20',
  'bottom-20 left-24',
  'bottom-28 right-14',
  'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
];

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(91,123,255,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(24,185,129,0.14),_transparent_28%),linear-gradient(180deg,#f8fbff_0%,#edf4ff_100%)] px-6 py-10">
      {floatingBoxes.map((position, index) => (
        <div
          key={position}
          className={`absolute ${position} h-24 w-24 rounded-[28px] border border-white/70 bg-white/60 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur animate-[float_${10 + index}s_ease-in-out_infinite]`}
          style={{ animationDelay: `${index * 180}ms` }}
        >
          <div className="flex h-full items-center justify-center">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#5b7bff] to-[#18b981] opacity-70" />
          </div>
        </div>
      ))}

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl items-center justify-center">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[#5b7bff]" />
            Page not found
          </div>

          <div className="relative mx-auto mb-8 flex h-64 w-64 items-center justify-center rounded-[40px] border border-white/80 bg-white/70 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur animate-[float_12s_ease-in-out_infinite]">
            <div className="absolute inset-6 rounded-[30px] border border-dashed border-slate-200" />
            <div className="relative text-8xl font-semibold tracking-tight text-slate-900">404</div>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">This page drifted off the map.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500">
            The page you asked for doesn’t exist or may have moved. Use the controls below to jump back to the landing page or a portal.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-primary inline-flex h-12 items-center rounded-full px-6 text-base">
              Go Home
            </Link>
            <Link href="/admin/login" className="inline-flex h-12 items-center rounded-full border border-slate-200 bg-white px-6 text-base font-medium text-slate-700 shadow-sm">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
