"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import type { Test } from '../../types';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  async function load() {
    try {
      setLoading(true);
      setError('');
      const t = await api.getTests();
      setTests(t.reverse());
    } catch (err: any) {
      setError(err?.message || 'Failed to load tests');
      console.error('Load tests error:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm('Delete test?')) return;
    try {
      await api.deleteTest(id);
      load();
    } catch (err: any) {
      setError(err?.message || 'Failed to delete test');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div>
          <Link href="/tests/new" className="px-4 py-2 bg-[#5b7bff] text-white rounded-lg hover:bg-[#4b67f0] transition">Create New Test</Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-8 text-slate-500">Loading tests...</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {tests.length === 0 && <div className="text-sm text-slate-500 py-8 text-center">No tests yet. Create one to get started.</div>}
          {tests.map((t) => (
            <div key={t.id} className="border rounded-lg p-4 flex items-center justify-between hover:shadow-md transition">
              <div>
                <div className="font-medium text-slate-900">{t.name}</div>
                <div className="text-sm text-slate-600">Subject: {String(t.subject) || '—'}</div>
                <div className="text-sm text-slate-600">Status: <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${t.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{t.status || 'draft'}</span></div>
              </div>
              <div className="flex gap-2">
                <Link href={`/tests/${t.id}/preview`} className="px-3 py-1 border rounded-lg hover:bg-slate-50 transition">View</Link>
                <Link href={`/tests/${t.id}/edit`} className="px-3 py-1 border rounded-lg hover:bg-slate-50 transition">Edit</Link>
                <Link href={`/tests/${t.id}/questions`} className="px-3 py-1 border rounded-lg hover:bg-slate-50 transition">Questions</Link>
                <button onClick={() => remove(t.id)} className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
