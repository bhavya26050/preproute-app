"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import TestForm from '../../../components/TestForm';
import { api } from '../../../lib/api';

export default function NewTestPage() {
  const router = useRouter();

  async function onSave(payload: any) {
    const created = await api.createTest(payload);
    router.push(`/tests/${created.id}/questions`);
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Test</h2>
      <div className="card p-6">
        <TestForm onSave={onSave} />
      </div>
    </div>
  );
}
