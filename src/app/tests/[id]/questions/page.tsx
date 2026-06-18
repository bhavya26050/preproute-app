"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../../../lib/api';
import type { Question } from '../../../../types';
import QuestionList from '../../../../components/QuestionList';

const toolbarButtons = ['I', 'B', 'U', '⟲', '⟶', '≡', '▤', '∑', 'ƒx'];

const answerSlots = ['A', 'B', 'C', 'D'];

export default function QuestionsPage() {
  const params: any = useParams();
  const id = params.id as string;
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editor, setEditor] = useState({ question: '', option1: '', option2: '', option3: '', option4: '', correct_option: 'option1' });

  useEffect(() => { api.getQuestionsByTest(id).then((q)=>{ setQuestions(q); if(q[0]) setActiveId(q[0].id); }); }, [id]);

  function selectQuestion(qid: string) {
    const q = questions.find(x=>x.id===qid);
    if(!q) return;
    setActiveId(qid);
    setEditor({ question: q.question||'', option1: q.option1||'', option2: q.option2||'', option3: q.option3||'', option4: q.option4||'', correct_option: q.correct_option||'option1' });
  }

  function updateField(k: string, v: string) { setEditor((s) => ({ ...s, [k]: v })); }

  function addLocal() {
    if (!editor.question) return alert('Question required');
    const q: Question = { ...editor, id: 'local-' + Math.random().toString(36).slice(2), type: 'mcq', test_id: id } as any;
    setQuestions((s) => s.concat(q));
    setEditor({ question: '', option1: '', option2: '', option3: '', option4: '', correct_option: 'option1' });
    setActiveId(q.id);
  }

  function deleteQuestion(idq: string) { setQuestions((s) => s.filter((q) => q.id !== idq)); if(activeId===idq) setActiveId(null); }

  async function saveAll() {
    const toCreate = questions.filter((q) => q.id.startsWith('local-')).map((q) => ({ ...q, id: undefined }));
    if (toCreate.length > 0) await api.bulkCreateQuestions(toCreate as any);
    router.push(`/tests/${id}/preview`);
  }

  function saveActive() {
    if(!activeId) return alert('Select a question');
    setQuestions((s)=>s.map(q=> q.id===activeId ? {...q, ...editor}: q));
    alert('Saved locally');
  }

    <div className="space-y-5 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500">Question creation</div>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">Chapter Wise</h2>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-ghost h-9 rounded-full px-4 text-sm">+ MCQ</button>
          <button className="btn-ghost h-9 rounded-full px-4 text-sm">CSV</button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[220px_1fr]">
        <div className="left-questions rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-medium text-slate-700">Total Questions . {questions.length || 0}</div>
          <div className="mt-4">
            <QuestionList questions={questions} onDelete={deleteQuestion} compact onSelect={selectQuestion} activeId={activeId || undefined} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="card overflow-hidden rounded-[30px] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
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

              <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3 py-2 text-xs text-slate-500 shadow-sm">
                <span>⏱ 60 Min</span>
                <span className="border-l pl-2">☑ 50 Q's</span>
                <span className="border-l pl-2">▣ 250 Marks</span>
              </div>
            </div>
          </div>

          <div className="card rounded-[30px] bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Question {questions.findIndex((q) => q.id === activeId) + 1 || 1}/
                  <span className="text-slate-400">50</span>
                </div>
                <button className="mt-2 text-sm font-medium text-[#ff6b6b] transition hover:text-[#ef4444]">Delete All Edits</button>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <button className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">+ MCQ</button>
                <button className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 shadow-sm">CSV</button>
              </div>
            </div>

            <div className="editor-area mt-4 overflow-hidden rounded-[18px] border border-[#d8e5ff] bg-white p-0 shadow-sm">
              <div className="flex flex-wrap items-center gap-2 border-b border-[#e9efff] px-4 py-3 text-xs text-slate-400">
                {toolbarButtons.map((btn) => (
                  <button key={btn} className="rounded-md px-2 py-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">
                    {btn}
                  </button>
                ))}
              </div>

              <div className="relative min-h-[180px] p-4">
                <div className="pointer-events-none absolute left-4 top-4 rounded-lg bg-[#ffd65c] px-2 py-1 text-sm font-semibold text-slate-900 shadow-sm">
                  {editor.question || 'Type here'}
                </div>
                <textarea
                  value={editor.question}
                  onChange={(e) => updateField('question', e.target.value)}
                  placeholder="Type here"
                  className="min-h-[180px] w-full resize-none rounded-lg border-0 bg-transparent pt-16 text-sm outline-none placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="mt-6 text-sm font-medium text-slate-800">Type the options below</div>
            <div className="mt-3 space-y-4">
              {answerSlots.map((slot, index) => (
                <div key={slot} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="correct-answer"
                    className="radio-input"
                    defaultChecked={index === 0}
                  />
                  <input
                    value={editor[`option${index + 1}` as keyof typeof editor] as string}
                    onChange={(e) => updateField(`option${index + 1}`, e.target.value)}
                    placeholder="Type Option here"
                    className="input-base h-12 flex-1 rounded-xl px-4"
                  />
                  <button type="button" className="text-slate-300 transition hover:text-slate-500">🗑</button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium text-slate-800">Add Solution</div>
              <textarea placeholder="Type here" className="mt-3 min-h-[120px] w-full rounded-[18px] border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-300" />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6 text-center text-slate-400">
              <div>‹</div>
              <div>•</div>
              <div>›</div>
            </div>

            <div className="mt-8 rounded-[24px] border border-slate-100 bg-slate-50/70 p-5">
              <div className="text-sm font-semibold text-slate-800">Question settings</div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Level of Difficulty</label>
                  <select className="input-base h-12 rounded-xl text-slate-400">
                    <option>Select from Drop-down</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Topic</label>
                  <select className="input-base h-12 rounded-xl text-slate-400">
                    <option>Select from Drop-down</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-600">Sub-topic</label>
                  <select className="input-base h-12 rounded-xl text-slate-400">
                    <option>Select from Drop-down</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button onClick={() => router.push('/dashboard')} className="rounded-xl bg-[#ff7f7f] px-4 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-[#ff6d6d]">
                Exit Test Creation
              </button>
              <div className="flex gap-3">
                <button onClick={saveActive} className="btn-ghost rounded-xl px-5 py-3">Save</button>
                <button onClick={saveAll} className="btn-primary rounded-xl px-6 py-3">Next</button>
              </div>
            </div>
          </div>
        </div>
        <button onClick={()=>router.push('/dashboard')} className="px-4 py-2 btn-ghost">Cancel</button>
