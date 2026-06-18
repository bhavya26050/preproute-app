"use client";
import React, { useEffect, useState } from 'react';
import type { CreateTestPayload, Test } from '../types';
import { api } from '../lib/api';

export default function TestForm({
  initial,
  onSave,
  disabled,
}: {
  initial?: Partial<Test>;
  onSave: (payload: CreateTestPayload) => Promise<void>;
  disabled?: boolean;
}) {
  const [name, setName] = useState(initial?.name || '');
  const [type, setType] = useState(initial?.type || 'practice');
  const [subject, setSubject] = useState<string>((initial?.subject as string) || '');
  const [topic, setTopic] = useState<string>('');
  const [subTopic, setSubTopic] = useState<string>('');
  const [totalTime, setTotalTime] = useState(initial?.total_time || 60);
  const [totalMarks, setTotalMarks] = useState(initial?.total_marks || 0);
  const [correctMarks, setCorrectMarks] = useState(initial?.correct_marks ?? 4);
  const [wrongMarks, setWrongMarks] = useState(initial?.wrong_marks ?? -1);
  const [unattemptMarks, setUnattemptMarks] = useState(initial?.unattempt_marks ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [subjects, setSubjects] = useState<{ id: string; name: string }[]>([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);

  useEffect(() => {
    api.getSubjects()
      .then(setSubjects)
      .catch((err) => {
        console.error('Failed to load subjects:', err);
        setError('Failed to load subjects');
      })
      .finally(() => setLoadingSubjects(false));
  }, []);

  async function submit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!name) return alert('Name required');
    
    setLoading(true);
    setError('');
    
    try {
      await onSave({
        name,
        type,
        subject,
        topics: topic ? [topic] : [],
        sub_topics: subTopic ? [subTopic] : [],
        total_time: Number(totalTime),
        total_marks: Number(totalMarks),
        correct_marks: Number(correctMarks),
        wrong_marks: Number(wrongMarks),
        unattempt_marks: Number(unattemptMarks),
      });
    } catch (err: any) {
      setError(err?.message || 'Failed to save test');
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      
      <div className="form-grid">
        <div>
          <label className="block text-sm text-gray-600">Subject</label>
          <select 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            className="input-base mt-1"
            disabled={loadingSubjects || disabled || loading}
          >
            <option value="">Choose from Drop-down</option>
            {subjects.map((s) => (
              <option value={s.id} key={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600">Name of Test</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name of Test" className="input-base mt-1" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Topic</label>
          <select value={topic} onChange={(e) => setTopic(e.target.value)} className="input-base mt-1">
            <option value="">Choose from Drop-down</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600">Sub Topic</label>
          <select value={subTopic} onChange={(e) => setSubTopic(e.target.value)} className="input-base mt-1">
            <option value="">Choose from Drop-down</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600">Duration (Minutes)</label>
          <input type="number" value={totalTime} onChange={(e) => setTotalTime(Number(e.target.value))} placeholder="Enter the time" className="input-base mt-1" />
        </div>

        <div>
          <label className="block text-sm text-gray-600">Test Difficulty Level</label>
          <div className="radio-row mt-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="difficulty"
                value="easy"
                defaultChecked
                className="radio-input"
              />
              <span>Easy</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="difficulty"
                value="medium"
                defaultChecked={false}
                className="radio-input"
              />
              <span>Medium</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="difficulty"
                value="difficult"
                defaultChecked={false}
                className="radio-input"
              />
              <span>Difficult</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <div className="text-sm text-gray-700 mb-2">Marking Scheme:</div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-gray-500">Wrong Answer</label>
            <div className="stepper mt-2">
              <button type="button" onClick={() => setWrongMarks((v) => v - 1)}>−</button>
              <input value={wrongMarks} onChange={(e) => setWrongMarks(Number(e.target.value))} />
              <button type="button" onClick={() => setWrongMarks((v) => v + 1)}>+</button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Unattempted</label>
            <div className="stepper mt-2">
              <button type="button" onClick={() => setUnattemptMarks((v) => v - 1)}>−</button>
              <input value={unattemptMarks} onChange={(e) => setUnattemptMarks(Number(e.target.value))} />
              <button type="button" onClick={() => setUnattemptMarks((v) => v + 1)}>+</button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500">Correct Answer</label>
            <div className="stepper mt-2">
              <button type="button" onClick={() => setCorrectMarks((v) => v - 1)}>−</button>
              <input value={correctMarks} onChange={(e) => setCorrectMarks(Number(e.target.value))} />
              <button type="button" onClick={() => setCorrectMarks((v) => v + 1)}>+</button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500">No of Questions</label>
            <input type="number" placeholder="Ex:250 Marks" className="input-base mt-2" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" className="btn-ghost" disabled={loading || disabled}>Cancel</button>
        <button type="submit" className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || disabled || loadingSubjects}>
          {loading ? 'Saving...' : 'Next'}
        </button>
      </div>
    </form>
  );
}
