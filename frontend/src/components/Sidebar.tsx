"use client";
import {
  Home,
  GraduationCap,
  ShoppingCart,
  Calendar,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserMenu from "./UserMenu";

const navItems = [
  { icon: <Home size={24} />, path: "/dashboard", tooltip: "Dashboard" },
  {
    icon: <GraduationCap size={24} />,
    path: "/learning",
    tooltip: "Courses",
    active: true,
  },
  {
    icon: <ShoppingCart size={24} />,
    path: "/shop",
    tooltip: "Shop",
  },
  {
    icon: <Calendar size={24} />,
    path: "/calendar",
    tooltip: "Calendar",
  },
  {
    icon: <Trophy size={24} />,
    path: "/achievements",
    tooltip: "Achievements",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-20 h-screen bg-[#001F2D] flex flex-col items-center py-6 justify-between text-white">
      <div>
        <Link href="/">
          <div className="mb-8 cursor-pointer bg-white">
            <Image src="/logo.png" alt="OLP Logo" width={40} height={40} />
          </div>
        </Link>

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

      <div className="mb-2">
        <UserMenu />
      </div>
    </aside>
  );
}
