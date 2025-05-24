// app/shop/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useAuth } from '../../contexts/authContext'

const shopItems = [
  {
    icon: "/shop/youtube.png",
    title: "-15% YouTube music month subscription",
    price: 1000,
  },
  {
    icon: "/shop/linkedin.png",
    title: "1 month free Linkedin premium",
    price: 2000,
  },
  {
    icon: "/shop/canva.png",
    title: "-20% for Canva Premium",
    price: 500,
  },
  {
    icon: "/shop/question.png",
    title: "No promotion",
    price: 2000,
  },
  {
    icon: "/shop/deepl.png",
    title: "Deepl Premium for Month",
    price: 1000,
  },
  {
    icon: "/shop/grammarly.png",
    title: "-10% Grammarly subscription",
    price: 1000,
  },
];

const Shop = () => {
  const { user, isLoading } = useAuth();
  return (
    <main className="flex-1 px-8 pt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-zinc-800">Shop</h1>
        <div className="flex items-center gap-2 font-semibold text-yellow-500">
          User credits: 
          <span>{user?.credits || 0}</span>
          <Image src="/shop/coin.png" alt="coins" width={20} height={20} />
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {shopItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.icon}
                alt="icon"
                width={36}
                height={36}
                className="border rounded-full"
              />
              <p className="text-sm md:text-base">{item.title}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 font-semibold">
              <span>{item.price}</span>
              <Image src="/shop/coin.png" alt="coins" width={20} height={20} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Shop;
