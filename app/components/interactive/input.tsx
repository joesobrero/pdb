"use client";

import { cn } from "@/app/lib/utils";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InputHTMLAttributes, forwardRef, useState } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: IconDefinition;
  rightIcon?: IconDefinition;
  rightIconAction?: () => void;
  rightIconLabel?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      leftIcon,
      rightIcon,
      rightIconAction,
      rightIconLabel,
      isValid,
      isInvalid,
      errorMessage,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Base styles for the input
    const inputStyles = cn(
      // Base styles
      "w-full rounded-lg transition-all duration-150",
      // Padding adjustments based on icons
      leftIcon ? "pl-10" : "pl-4",
      rightIcon ? "pr-10" : "pr-4",
      "py-3",
      // State styles
      "border",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus:bg-base-200",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      // Validation states
      isValid && "border-content",
      isInvalid && "border-destructive",
      // Hover state (when not focused)
      !isFocused && "hover:border-content",
      className
    );

    // Icon container styles
    const iconContainerStyles =
      "absolute top-0 bottom-0 flex items-center justify-center w-12 h-full";

    return (
      <div className="w-full">
        <div
          className={cn(
            "relative text-muted",
            isValid && "text-content",
            isInvalid && "text-red-500"
          )}
        >
          {/* Left Icon */}
          {leftIcon && (
            <div className={cn(iconContainerStyles, "left-0")}>
              <FontAwesomeIcon icon={leftIcon} />
            </div>
          )}

          {/* Input Element */}
          <input
            ref={ref}
            className={inputStyles}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* Right Icon Button */}
          {rightIcon && (
            <button
              type="button"
              onClick={rightIconAction}
              aria-label={rightIconLabel || "Input action"}
              className={cn(
                iconContainerStyles,
                "right-0 hover:text-content cursor-pointer transition-colors"
              )}
            >
              <FontAwesomeIcon icon={rightIcon} />
            </button>
          )}
        </div>

        {/* Error Message */}
        {isInvalid && errorMessage && (
          <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

// force update
Input.displayName = "Input";

export default Input;
