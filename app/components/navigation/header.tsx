"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="p-12 flex flex-row justify-start fixed">
      <Link
        href={pathname === "/" ? "/" : "/dashboard"}
        className="text-xl font-display font-bold tracking-wide opacity-20 hover:opacity-30 transition-opacity"
      >
        PDB
      </Link>
    </header>
  );
}
