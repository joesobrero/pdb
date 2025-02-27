"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();

  return pathname.includes("/dashboard") ? (
    <></>
  ) : (
    <header className="pt-12 px-4 md:px-12 flex flex-row justify-start fixed z-10">
      <Link
        href="/"
        className="text-base md:text-xl font-display font-bold tracking-wide opacity-20 hover:opacity-30 transition-opacity"
      >
        PDB
      </Link>
    </header>
  );
}
