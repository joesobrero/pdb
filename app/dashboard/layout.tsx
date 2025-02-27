"use client";

import {
  faGlobe,
  faFolder,
  faPlus,
  faCircleQuestion,
  faNewspaper,
  faScroll,
  faFolderOpen,
} from "@fortawesome/pro-regular-svg-icons";
import Button from "../components/interactive/button";
import Divider from "../components/display/divider";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import Link from "next/link";

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

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-fit md:min-w-64 h-screen sticky border-r border-base-300 bg-base-100 space-y-3">
      <div className="flex flex-col gap-2 p-3 pt-24 relative">
        <Link
          href="/dashboard"
          className={cn(
            "absolute top-12 font-display font-bold tracking-wide opacity-20 hover:opacity-30 transition-opacity",
            "left-3.5 md:left-6 text-base md:text-xl"
          )}
        >
          PDB
        </Link>

        <Button
          variant="sidebar"
          className={`w-full ${pathname === "/dashboard" ? "bg-base-200" : ""}`}
          iconLeft={faScroll}
          href="/dashboard"
        >
          Feed
        </Button>

        <Button
          variant="sidebar"
          className={`w-full ${
            pathname === "/dashboard/community" ? "bg-base-200" : ""
          }`}
          iconLeft={faGlobe}
          href="/dashboard/community"
        >
          Community
        </Button>

        <Button
          variant="sidebar"
          href="/dashboard/my-briefs"
          iconLeft={
            pathname === "/dashboard/my-briefs" ? faFolderOpen : faFolder
          }
          className={`w-full ${
            pathname === "/dashboard/my-briefs" ? "bg-base-200" : ""
          }`}
        >
          My briefs
        </Button>

        <Button
          variant="sidebar"
          href="/dashboard/new-brief"
          iconLeft={faPlus}
          className={`w-full ${
            pathname === "/dashboard/new-brief" ? "bg-base-200" : ""
          }`}
        >
          New brief
        </Button>

        <Button
          variant="sidebar"
          href="/dashboard/feedback"
          iconLeft={faCircleQuestion}
          className={`w-full ${
            pathname === "/dashboard/feedback" ? "bg-base-200" : ""
          }`}
        >
          Feedback
        </Button>
      </div>

      <Divider />

      {/* Briefs Section */}
      <div className="p-3 flex flex-col gap-2">
        <h3 className="mb-3 text-xs text-muted">Briefs</h3>
        <Button
          variant="sidebar"
          href="/dashboard/briefs/luxury-real-estate"
          iconLeft={faNewspaper}
          className={
            pathname === "/dashboard/briefs/luxury-real-estate"
              ? "bg-base-200"
              : ""
          }
        >
          Luxury Real Estate
        </Button>

        <Button
          variant="sidebar"
          href="/dashboard/briefs/view-all"
          className={
            pathname === "/dashboard/briefs/view-all" ? "bg-base-200" : ""
          }
        >
          View all
        </Button>
      </div>
    </nav>
  );
};

export default DashboardLayout;
