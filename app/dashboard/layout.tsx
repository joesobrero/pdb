"use client";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import { cn } from "@/app/lib/utils";
import Sidebar from "../components/navigation/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <Sidebar />
        <main
          className={cn(
            "w-full flex flex-col gap-8 pt-24",
            "px-6 md:px-12 lg:px-24"
          )}
        >
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
