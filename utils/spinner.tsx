// components/FullPageSpinner.tsx
'use client';
import React from 'react';

export default function FullPageSpinner() {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 z-50"
      role="status"
      aria-label="Loading"
    >
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
    </div>
  );
}
