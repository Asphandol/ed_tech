"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // not logged in
      router.push("/login");
    } else if (user) {
      // logged in
      router.push("/dashboard");
    }
  }, [user]);

  return null; // You can show a loading spinner if desired
};

export default Home;
