"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/store/auth-store";

import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { useSidebar } from "@/lib/hooks/useSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  const { collapsed, setCollapsed, open, setOpen } = useSidebar(); // 👈 NEW

  useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return null;
  if (!isAuthenticated) return null;

  return (
    <div className="h-screen overflow-hidden bg-[#0a0a0a]">
      {/* SIDEBAR */}
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} open={open} setOpen={setOpen} />

      {/* CONTENT */}
      <div
        className={`flex h-full flex-col transition-all duration-300 ${
          collapsed ? "md:ml-16" : "md:ml-64"
        }`}
      >
        {/* HEADER */}
        <Header setOpen={setOpen} />

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mx-auto h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
