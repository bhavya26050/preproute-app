"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose?: () => void }) {
  const router = useRouter();
  function close() {
    if (onClose) onClose();
    else router.back();
  }
  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal-card" onClick={(e)=>e.stopPropagation()}>
        <div className="flex justify-end">
          <button onClick={close} className="text-gray-400">✕</button>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}
