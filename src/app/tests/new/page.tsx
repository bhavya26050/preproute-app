"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TestForm from '../../../components/TestForm';
import { api } from '../../../lib/api';

export default function NewTestPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSave(payload: any) {
    try {
      setLoading(true);
      setError('');
      const created = await api.createTest(payload);
      router.push(`/tests/${created.id}/questions`);
    } catch (err: any) {
      setError(err?.message || 'Failed to create test');
      console.error('Create test error:', err);
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Test</h2>
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}
      <div className="card p-6">
        <TestForm onSave={onSave} disabled={loading} />
      </div>
    </div>
  );
}
