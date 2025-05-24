'use client'
import { useState } from 'react'
import { Home, GraduationCap, Lightbulb, MessageSquare, Radio } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const navItems = [
  { icon: <Home size={24} />, path: '/', tooltip: 'Dashboard' },
  { icon: <GraduationCap size={24} />, path: '/courses', tooltip: 'Courses', active: true },
  { icon: <Lightbulb size={24} />, path: '/ideas', tooltip: 'Ideas' },
  { icon: <MessageSquare size={24} />, path: '/messages', tooltip: 'Messages' },
  { icon: <Radio size={24} />, path: '/audio', tooltip: 'Podcasts' },
]

export default function Sidebar() {
  return (
    <aside className="w-20 h-screen bg-[#001F2D] flex flex-col items-center py-6 justify-between text-white">
      {/* Top Logo */}
      <div>
        <Link href="/">
          <div className="mb-8 cursor-pointer">
            <Image src="/images/logo.png" alt="OLP Logo" width={40} height={40} />
          </div>
        </Link>

        {/* Navigation Icons */}
        <nav className="space-y-6">
          {navItems.map((item, index) => (
            <Link href={item.path} key={index}>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition my-5 hover:bg-blue-800`}
              >
                {item.icon}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom Avatar */}
      <div className="mb-2">
        <button className="w-10 h-10 rounded-full bg-purple-400 text-white text-lg hover:scale-105 transition">
          😊
        </button>
      </div>
    </aside>
  )
}

// ${
//     item.active ? 'bg-blue-500 text-white' : 'text-white hover:bg-blue-800'
// }