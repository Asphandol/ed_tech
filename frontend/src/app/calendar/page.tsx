"use client"  

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [progress, setProgress] = useState(30);
  return (
    <div className="flex min-h-screen bg-gray-50 ">
      <Sidebar/>

      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-black">Plan Session</h1>
        </header>

    
      </main>
    </div>
  );
}
