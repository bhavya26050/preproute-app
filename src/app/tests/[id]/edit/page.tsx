"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import TestForm from '../../../../components/TestForm';
import { api } from '../../../../lib/api';
import type { Test } from '../../../../types';
import Modal from '../../../../components/Modal';

export default function EditTestPage() {
  const router = useRouter();
  const params: any = useParams();
  const id = params.id as string;
  const [test, setTest] = useState<Test | null>(null);

  useEffect(() => { api.getTestById(id).then(setTest); }, [id]);
  async function onSave(payload: any) {
    await api.updateTest(id, payload);
    router.push(`/tests/${id}/questions`);
  }

  if (!test) return null;

  return (
    <Modal onClose={()=>router.push(`/tests/${id}/questions`)}>
      <div>
        <h3 className="text-lg font-semibold mb-2">Edit Test creation</h3>
        <div className="mb-4">
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-blue-50 text-blue-600">Chapter Wise</button>
            <button className="px-3 py-1 rounded">PYQ</button>
            <button className="px-3 py-1 rounded">Mock Test</button>
          </div>
        </div>
        <TestForm initial={test} onSave={onSave} />
      </div>
    </Modal>
  );
}
