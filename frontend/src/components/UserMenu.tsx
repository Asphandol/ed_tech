"use client";

import { useState } from "react";
import { LogOut, User } from "lucide-react";
import Image from "next/image";

export default function UserMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full bg-purple-400 text-white text-lg hover:scale-105 transition"
      >
        😊
      </button>

      {open && (
        <div className="absolute bottom-14 left-0 w-64 bg-slate-900 text-white rounded-xl shadow-lg p-4 z-50">
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
          <div className="mt-4 flex items-center gap-3">
            <Image
              src="/images/avatar.png"
              alt="avatar"
              width={36}
              height={36}
              className="rounded-full bg-purple-500"
            />
            <div>
              <p className="text-sm font-semibold leading-none">
                Mohammad Shams Tabrez
              </p>
              <p className="text-xs text-gray-400">UI / UX Developer</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
