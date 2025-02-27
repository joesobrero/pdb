"use client";

import { cn } from "@/app/lib/utils";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesUpDown } from "@fortawesome/pro-regular-svg-icons";
import { SelectHTMLAttributes, forwardRef } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  leftIcon?: IconDefinition;
  isValid?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      options,
      leftIcon,
      isValid,
      isInvalid,
      errorMessage,
      ...props
    },
    ref
  ) => {
    // Base styles for the select
    const selectStyles = cn(
      // Base styles
      "w-full rounded-lg transition-all duration-150 appearance-none cursor-pointer",
      // Padding adjustments based on icons
      leftIcon ? "pl-10" : "pl-4",
      "pr-10 py-3",
      // State styles
      "border",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      // Validation states
      isValid && "border-green-500 bg-green-50/10",
      isInvalid && "border-red-500 bg-red-50/10",
      // Hover state
      "hover:border-content",
      className
    );

    // Icon container styles
    const iconContainerStyles =
      "absolute top-0 bottom-0 flex items-center justify-center w-12 h-full";

    return (
      <div className="w-full">
        <div className="relative text-muted">
          {/* Left Icon */}
          {leftIcon && (
            <div className={cn(iconContainerStyles, "left-0")}>
              <FontAwesomeIcon icon={leftIcon} />
            </div>
          )}

          {/* Select Element */}
          <select ref={ref} className={selectStyles} {...props}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Right Icon */}
          <div
            className={cn(iconContainerStyles, "right-0 pointer-events-none")}
          >
            <FontAwesomeIcon icon={faAnglesUpDown} />
          </div>
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
Select.displayName = "Select";

export default Select;
