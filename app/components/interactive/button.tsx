"use client";

import { cn } from "@/app/lib/utils";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type BaseButtonProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: keyof typeof variants;
  iconRight?: IconDefinition;
  iconLeft?: IconDefinition;
  children?: React.ReactNode;
  href?: string;
};

type ButtonAsButton = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: never;
  };

type ButtonAsLink = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = ({
  className,
  size = "md",
  variant = "primary",
  iconRight,
  iconLeft,
  children,
  href,
  ...props
}: ButtonProps) => {
  const baseStyles = cn(
    "rounded-lg font-medium gap-3 flex flex-row items-center leading-none",
    "transition-all duration-150",
    "hover:cursor-pointer",
    "disabled:opacity-50 focus:outline-none",
    "focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-teal-400",
    size === "sm" && "px-3.5 py-2 text-sm",
    size === "md" && "px-3.5 py-3",
    size === "lg" && "px-5 py-4"
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
        {...(props as Omit<ButtonAsLink, "href">)}
      >
        {content}
      </Link>
    </div>
  ) : (
    <button
      className={cn(className, baseStyles, variants[variant], "group")}
      {...(props as ButtonAsButton)}
    >
      {content}
    </button>
  );
};

const variants = {
  primary: "text-base-100 bg-content",
  subtle: "text-content bg-base-200 hover:bg-base-300",
  outline: "text-content border-base-200 border hover:border-base-300",
  ghost: "text-content bg-transparent hover:bg-base-200",
};

export default Button;
