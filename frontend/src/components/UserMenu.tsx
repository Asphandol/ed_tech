"use client";

import { useState } from "react";
import { LogOut, User, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-white hover:opacity-80"
      >
        <Image
          src="/images/avatar.png"
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full bg-purple-500"
        />
        <div className="text-left hidden sm:block">
          <p className="text-sm font-semibold">Mohammad Shams Tabrez</p>
          <p className="text-xs text-gray-300">UI / UX Developer</p>
        </div>
        <ChevronDown size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-slate-900 text-white rounded-lg shadow-lg p-4 z-50">
          <ul className="space-y-4">
            <li className="flex items-center gap-3 cursor-pointer hover:opacity-80">
              <LogOut size={18} />
              <span>Logout</span>
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:opacity-80">
              <User size={18} />
              <span>Profile</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
