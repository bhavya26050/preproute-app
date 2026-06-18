"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../../../lib/api';
import type { Test } from '../../../../types';

export default function PreviewPage() {
  const params: any = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [mode, setMode] = useState<'publish' | 'schedule'>('publish');
  const [liveUntil, setLiveUntil] = useState('custom');

  useEffect(() => {
    api.getTestById(id).then(setTest);
    api.getQuestionsByTest(id).then(setQuestions);
  }, [id]);

  if (!test) return <div>Loading...</div>;

  async function publish() {
    await api.updateTest(id, { status: 'live' });
    alert('Test published');
    router.push('/dashboard');
  }

  return (
    <div className="space-y-5 pb-10">
      <div className="text-sm text-slate-500">Test creation</div>

      <div className="flex items-center gap-3">
        <div className="font-semibold text-slate-900">Test created</div>
        <span className="inline-flex items-center gap-2 rounded-full border border-[#bfead1] bg-[#f2fbf5] px-3 py-1 text-xs font-medium text-[#1a8b58] shadow-sm">
          <span className="h-2 w-2 rounded-full bg-[#1a8b58]" />
          All 50 Questions done
        </span>
      </div>

      <div className="card rounded-[30px] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex rounded-full bg-[#1b1d52] px-3 py-1 text-xs font-medium text-white">Chapter Wise</div>
            <div className="mt-4 flex items-center gap-3">
              <div className="text-xl font-semibold text-slate-900">Chapter 1</div>
              <span className="chip !bg-[#eafaf4] !text-[#15815a]">Easy</span>
            </div>
            <div className="mt-4 grid gap-3 text-sm text-slate-500 sm:grid-cols-3">
              <div><span className="text-slate-400">Subject</span> : English</div>
              <div><span className="text-slate-400">Topic</span> : <span className="chip mr-1">Grammar</span><span className="chip">Writing</span></div>
              <div><span className="text-slate-400">Sub Topic</span> : <span className="chip">Application</span></div>
            </div>
          </div>

          <div className="rounded-full border border-slate-100 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
            <span>⏱ 60 Min</span>
            <span className="mx-3 border-l pl-3">☑ 50 Q's</span>
            <span className="border-l pl-3">▣ 250 Marks</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm md:w-fit">
        <button onClick={() => setMode('publish')} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${mode === 'publish' ? 'bg-[#eef4ff] text-[#374151] shadow-sm' : 'text-slate-400'}`}>
          Publish Now
        </button>
        <button onClick={() => setMode('schedule')} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${mode === 'schedule' ? 'bg-[#eef4ff] text-[#374151] shadow-sm' : 'text-slate-400'}`}>
          Schedule Publish
        </button>
      </div>

      {mode === 'schedule' && (
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Select Date and Time</label>
            <input className="input-base h-12 rounded-xl" placeholder="Select Date" />
          </div>
          <div className="flex items-end">
            <input className="input-base h-12 rounded-xl" placeholder="Select Time" />
          </div>
        </div>
      )}

      <div className="space-y-4 rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
        <div className="text-sm font-semibold text-slate-900">Live Until</div>
        <p className="text-sm text-slate-500">Choose how long this test should remain available on the platform.</p>

        <div className="grid gap-5 md:grid-cols-2">
          {[
            ['always', 'Always Available'],
            ['1week', '1 Week'],
            ['2weeks', '2 Weeks'],
            ['3weeks', '3 Weeks'],
            ['1month', '1 Month'],
            ['custom', 'Custom Duration'],
          ].map(([value, label]) => (
            <label key={value} className="flex items-center gap-3 text-sm text-slate-700">
              <input type="radio" name="liveUntil" checked={liveUntil === value} onChange={() => setLiveUntil(value)} className="radio-input" />
              <span>{label}</span>
            </label>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <input className="input-base h-12 rounded-xl" placeholder="Select End Date" />
          <input className="input-base h-12 rounded-xl" placeholder="Select End Time" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => router.push(`/tests/${id}/questions`)} className="btn-ghost rounded-xl px-5 py-3">
            Cancel
          </button>
          <button onClick={publish} className="btn-primary rounded-xl px-6 py-3">
            Confirm
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {questions.map((q, idx) => (
          <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="font-medium text-slate-800">Q{idx + 1}. {q.question}</div>
            <div className="mt-3 grid gap-2 text-sm text-slate-600 md:grid-cols-2">
              <div className="rounded-xl border border-slate-100 px-3 py-2">A. {q.option1}</div>
              <div className="rounded-xl border border-slate-100 px-3 py-2">B. {q.option2}</div>
              <div className="rounded-xl border border-slate-100 px-3 py-2">C. {q.option3}</div>
              <div className="rounded-xl border border-slate-100 px-3 py-2">D. {q.option4}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button onClick={() => router.push(`/tests/${id}/edit`)} className="btn-ghost rounded-xl px-5 py-3">Edit Test</button>
        <button onClick={publish} className="btn-primary rounded-xl px-6 py-3">Publish Test</button>
      </div>
    </div>
  );
}
