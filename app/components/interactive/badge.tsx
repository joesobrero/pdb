"use client";

import { cn } from "@/app/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import { ButtonHTMLAttributes } from "react";

export interface BadgeProps extends ButtonHTMLAttributes<HTMLDivElement> {
  label: string;
  onRemove?: () => void;
  variant?: "solid" | "outline" | "ghost" | "subtle" | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantStyles = {
  solid: "bg-content text-base-100",
  outline: "border border-content bg-base-100 text-content",
  ghost: "bg-transparent text-content",
  subtle: "bg-base-200 text-content",
  destructive: "bg-red-500/10 text-red-600",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5 rounded-sm",
  md: "text-sm px-2.5 py-1 rounded-md",
  lg: "text-base px-3 py-1.5 rounded-lg",
};

const iconStyles = {
  solid: "text-base-100/70 hover:text-base-100",
  outline: "text-content/50 hover:text-content",
  ghost: "text-content/50 hover:text-content",
  subtle: "text-content/50 hover:text-content",
  destructive: "text-red-600/50 hover:text-red-600",
};

const Badge = ({
  label,
  onRemove,
  variant = "solid",
  size = "md",
  className,
  ...props
}: BadgeProps) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1.5 font-medium items-center tracking-wide",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn(
            "transition-colors rounded-sm cursor-pointer",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-teal-400",
            "items-center justify-center flex",
            iconStyles[variant],
            size === "sm" && "w-2 h-2",
            size === "md" && "w-3 h-3",
            size === "lg" && "w-4 h-4"
          )}
          aria-label={`Remove ${label}`}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
    </div>
  );
};

export default Badge;
