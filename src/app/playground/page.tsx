'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PlaygroundPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to explore page where users can select a prompt to test
    router.push('/explore');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-4">Redirecting to Explore...</h1>
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
