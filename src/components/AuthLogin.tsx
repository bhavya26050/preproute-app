"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../lib/api';

export default function AuthLogin({ role }: { role: 'admin' | 'student' }) {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [testCode, setTestCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      let res;
      if (role === 'admin') {
        res = await api.login({ userId, password });
      } else {
        res = await api.loginStudent({ email: userId, testCode });
      }
      
      localStorage.setItem('role', role);
      router.push(role === 'admin' ? '/dashboard' : '/student/dashboard');
    } catch (err: any) {
      setError(err?.message || 'Login failed');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[28px] bg-white shadow-[0_20px_80px_rgba(25,39,88,0.12)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden min-h-[760px] overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(91,123,255,0.20),_transparent_35%),linear-gradient(180deg,#f7fbff_0%,#edf4ff_100%)] lg:flex lg:flex-col lg:justify-between">
          <div className="absolute left-10 top-10 h-36 w-36 rounded-full bg-[#5b7bff]/10 blur-3xl animate-[float_10s_ease-in-out_infinite]" />
          <div className="absolute right-16 top-24 h-24 w-24 rounded-full bg-[#18b981]/15 blur-2xl animate-[float_13s_ease-in-out_infinite]" />
          <div className="absolute bottom-24 left-24 h-28 w-28 rounded-full bg-[#ffd166]/20 blur-3xl animate-[float_12s_ease-in-out_infinite]" />

          <div className="relative z-10 px-14 pt-12">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/70 bg-white/75 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm backdrop-blur">
              <span className="h-2.5 w-2.5 rounded-full bg-[#5b7bff]" />
              AI-assisted test creation for modern teams
            </div>
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center px-10">
            <div className="relative h-[420px] w-[480px]">
              <div className="absolute left-14 top-16 h-24 w-40 rounded-[28px] bg-white/85 shadow-[0_14px_40px_rgba(15,23,42,0.08)] animate-[float_7s_ease-in-out_infinite]" />
              <div className="absolute left-24 top-36 h-56 w-52 rounded-[40px] border border-slate-200/80 bg-white/90 shadow-[0_30px_50px_rgba(15,23,42,0.09)] animate-[float_9s_ease-in-out_infinite]" />
              <div className="absolute bottom-24 left-0 h-4 w-[420px] rounded-full bg-slate-700/35" />
              <div className="absolute bottom-0 left-20 h-72 w-2 rounded-full bg-slate-400/80" />
              <div className="absolute bottom-0 right-24 h-72 w-2 rounded-full bg-slate-400/80" />
              <div className="absolute left-40 top-8 h-8 w-8 rounded-full border border-slate-700/20" />
              <div className="absolute right-20 top-36 h-6 w-6 rounded-full border border-slate-700/20" />
              <div className="absolute left-56 top-56 h-10 w-10 rounded-full border border-slate-700/20" />
              <div className="absolute left-44 top-40 h-2 w-2 rounded-full bg-slate-900" />
              <div className="absolute left-52 top-40 h-2 w-2 rounded-full bg-slate-900" />
              <div className="absolute left-44 top-46 h-1.5 w-10 rounded-full bg-slate-300" />
              <div className="absolute left-44 top-0 h-16 w-4 rounded-b-full bg-[#b9d4ff]" />
              <div className="absolute left-[196px] top-[6px] h-5 w-16 rounded-t-full bg-[#b9d4ff]" />
              <div className="absolute left-44 top-[350px] h-14 w-16 rounded-t-xl bg-[#b9d4ff]" />
              <div className="absolute left-40 top-[360px] h-3 w-24 rounded-full bg-[#b9d4ff]" />
              <div className="absolute left-[148px] top-[164px] h-32 w-2 rounded-full bg-slate-500/70" />
              <div className="absolute left-[196px] top-[164px] h-32 w-2 rounded-full bg-slate-500/70" />
            </div>
          </div>

          <div className="relative z-10 px-14 pb-12">
            <div className="grid grid-cols-3 gap-4 text-sm text-slate-600">
              <div className="rounded-2xl bg-white/75 p-4 shadow-sm backdrop-blur">
                <div className="text-2xl font-semibold text-slate-900">120+</div>
                <div>Tests created weekly</div>
              </div>
              <div className="rounded-2xl bg-white/75 p-4 shadow-sm backdrop-blur">
                <div className="text-2xl font-semibold text-slate-900">99%</div>
                <div>Faster publishing workflow</div>
              </div>
              <div className="rounded-2xl bg-white/75 p-4 shadow-sm backdrop-blur">
                <div className="text-2xl font-semibold text-slate-900">24/7</div>
                <div>Accessible across devices</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white px-6 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5b7bff] text-lg font-semibold text-white shadow-lg shadow-blue-200">
                P
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tight text-[#3563eb]">Preproute</div>
                <div className="text-sm text-slate-400">Modern assessment management</div>
              </div>
            </div>

            <div className="mb-8 space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
                {role === 'admin' ? 'Admin Portal' : 'Student Portal'}
              </h1>
              <p className="max-w-sm text-sm leading-6 text-slate-500">
                {role === 'admin'
                  ? 'Create tests, manage questions, and publish assessments with a clean workflow.'
                  : 'Take assessments, track progress, and revisit results from one streamlined experience.'}
              </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                  {error}
                </div>
              )}
              
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  {role === 'admin' ? 'Email' : 'Email'}
                </label>
                <input
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder={role === 'admin' ? 'Enter your email' : 'Enter your email'}
                  className="input-base h-12 rounded-xl px-4 text-base placeholder:text-slate-300"
                  disabled={loading}
                />
              </div>
              
              {role === 'admin' ? (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="input-base h-12 rounded-xl px-4 text-base placeholder:text-slate-300"
                    disabled={loading}
                  />
                </div>
              ) : (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Test Code</label>
                  <input
                    value={testCode}
                    onChange={(e) => setTestCode(e.target.value)}
                    placeholder="Enter Test Code"
                    className="input-base h-12 rounded-xl px-4 text-base placeholder:text-slate-300"
                    disabled={loading}
                  />
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <a className="font-medium text-[#5b7bff] transition hover:text-[#4b67f0]" href="#">
                  Forgot password?
                </a>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                  {role === 'admin' ? 'Admin access' : 'Student access'}
                </span>
              </div>

              <button 
                disabled={loading}
                className="btn-primary mt-2 h-12 w-full rounded-xl text-base shadow-[0_18px_40px_rgba(91,123,255,0.28)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(91,123,255,0.34)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>

              <div className="flex items-center justify-between pt-2 text-sm text-slate-500">
                <button
                  type="button"
                  className="font-medium text-[#5b7bff] hover:text-[#4b67f0]"
                  onClick={() => {
                    if (role === 'admin') {
                      setUserId('vedant-admin');
                      setPassword('vedant123');
                    } else {
                      setUserId('student@example.com');
                      setTestCode('DEMO123');
                    }
                  }}
                >
                  Use demo credentials
                </button>
                <span>Powered by Preproute</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
