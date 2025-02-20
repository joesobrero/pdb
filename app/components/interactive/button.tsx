"use client";

import { cn } from "@/app/lib/utils";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type ButtonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: keyof typeof variants;
  iconRight?: IconDefinition;
  iconLeft?: IconDefinition;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

const Button = ({
  className,
  size = "md",
  variant = "primary",
  iconRight,
  iconLeft,
  children,
  onClick,
  href,
}: ButtonProps) => {
  const baseStyles = cn(
    "rounded-full font-medium gap-3 flex flex-row items-center leading-none",
    "transition-all duration-150",
    "hover:cursor-pointer",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-6 py-4",
    size === "lg" && "px-8 py-6"
  );

  const content = (
    <>
      {iconLeft && <FontAwesomeIcon icon={iconLeft} />}
      {children}
      {iconRight && <FontAwesomeIcon icon={iconRight} />}
    </>
  );

  return href ? (
    <div className="contents group">
      <Link
        className={cn(baseStyles, variants[variant], className)}
        href={href}
        onClick={onClick}
      >
        {content}
      </Link>
    </div>
  ) : (
    <button
      className={cn(className, baseStyles, variants[variant], "group")}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

const variants = {
  primary: "text-content bg-base-200 hover:bg-base-300 rounded-full",
  outline:
    "text-content border-base-200 border hover:border-base-300 rounded-full",
};

export default Button;
