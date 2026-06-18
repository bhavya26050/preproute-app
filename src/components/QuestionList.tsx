"use client";
import React from 'react';
import type { Question } from '../types';

export default function QuestionList({ questions, onDelete, compact, onSelect, activeId }: { questions: Question[]; onDelete: (id: string) => void; compact?: boolean; onSelect?: (id:string)=>void; activeId?: string }) {
  if (!questions.length) return <div className="text-sm text-zinc-500">No questions added yet.</div>;
  if (compact) {
    return (
      <div className="q-list">
        {questions.map((q, idx) => (
          <div
            key={q.id}
            className={`q-item cursor-pointer transition ${activeId === q.id ? 'bg-[#eefbf4] text-[#18794e] shadow-sm' : 'inactive'}`}
            onClick={() => onSelect?.(q.id)}
          >
            <div className="flex items-center gap-2">
              <span className={`flex h-4 w-4 items-center justify-center rounded-full border text-[10px] ${activeId === q.id ? 'border-[#1cb67f] bg-[#1cb67f] text-white' : 'border-slate-300 text-slate-400'}`}>
                {activeId === q.id ? '✓' : '•'}
              </span>
              <div className="text-sm font-medium">Question {idx + 1}</div>
            </div>
            <div className="text-[11px] text-slate-500">{q.question?.slice(0, 16) || 'Question x'}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((q, idx) => (
        <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="font-medium text-slate-800">Question {idx + 1}</div>
            <button onClick={() => onDelete(q.id)} className="text-sm text-red-500 transition hover:text-red-600">Delete</button>
          </div>
          <div className="mt-3 text-sm leading-7 text-slate-600">{q.question}</div>
          <ul className="mt-3 grid gap-2 text-sm">
            <li className="rounded-xl border border-slate-100 px-3 py-2">A. {q.option1}</li>
            <li className="rounded-xl border border-slate-100 px-3 py-2">B. {q.option2}</li>
            <li className="rounded-xl border border-slate-100 px-3 py-2">C. {q.option3}</li>
            <li className="rounded-xl border border-slate-100 px-3 py-2">D. {q.option4}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
