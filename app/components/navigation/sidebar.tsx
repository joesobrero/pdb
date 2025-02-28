import {
  faCircleQuestion,
  faFolder,
  faFolderOpen,
  faGear,
  faGlobe,
  faNewspaper,
  faPlus,
  faUser,
} from "@fortawesome/pro-regular-svg-icons";
import Link from "next/link";
import Button from "../interactive/button";
import { faScroll } from "@fortawesome/pro-regular-svg-icons";
import Divider from "../display/divider";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "min-w-17 md:min-w-64 h-screen sticky overflow-y-auto",
        "border-r border-base-300 bg-base-100 space-y-3",
        "scrollbar-track-transparent"
      )}
    >
      {/* Main Pages */}
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
          iconLeft={pathname.includes("my-briefs") ? faFolderOpen : faFolder}
          className={`w-full ${
            pathname.includes("my-briefs") ? "bg-base-200" : ""
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
      </div>

      <Divider />

      {/* Subscriptions Section */}
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

      <Divider />

      {/* Settings Section */}
      <div className="p-3 flex flex-col gap-2 self-end justify-self-end">
        <h3 className="mb-3 text-xs text-muted">Settings</h3>
        <Button
          variant="sidebar"
          href="/dashboard/account"
          iconLeft={faUser}
          className={pathname.includes("account") ? "bg-base-200" : ""}
        >
          Account
        </Button>
        <Button
          variant="sidebar"
          href="/dashboard/settings"
          iconLeft={faGear}
          className={pathname.includes("settings") ? "bg-base-200" : ""}
        >
          Settings
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
    </nav>
  );
};

export default Sidebar;
