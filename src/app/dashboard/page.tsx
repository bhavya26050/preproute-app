"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import type { Test } from '../../types';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [tests, setTests] = useState<Test[]>([]);
  const router = useRouter();

  async function load() {
    const t = await api.getTests();
    setTests(t.reverse());
  }

  useEffect(() => { load(); }, []);

  async function remove(id: string) {
    if (!confirm('Delete test?')) return;
    await api.deleteTest(id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <div>
          <Link href="/tests/new" className="px-4 py-2 bg-green-600 text-white rounded">Create New Test</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tests.length === 0 && <div className="text-sm text-zinc-500">No tests yet. Create one to get started.</div>}
        {tests.map((t) => (
          <div key={t.id} className="border rounded p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{t.name}</div>
              <div className="text-sm text-zinc-600">Subject: {String(t.subject) || '—'}</div>
              <div className="text-sm text-zinc-600">Status: {t.status || 'draft'}</div>
            </div>
            <div className="flex gap-2">
              <Link href={`/tests/${t.id}/preview`} className="px-3 py-1 border rounded">View</Link>
              <Link href={`/tests/${t.id}/edit`} className="px-3 py-1 border rounded">Edit</Link>
              <Link href={`/tests/${t.id}/questions`} className="px-3 py-1 border rounded">Questions</Link>
              <button onClick={() => remove(t.id)} className="px-3 py-1 text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
