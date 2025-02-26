"use client";

import { cn } from "@/app/lib/utils";
import Input from "@/app/components/interactive/Input";
import { faUser } from "@fortawesome/pro-regular-svg-icons";
import { useState } from "react";

const NewBriefPage = () => {
  const [briefName, setBriefName] = useState("");
  const [isNameValid, setIsNameValid] = useState<boolean | undefined>(
    undefined
  );

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBriefName(value);

    // Simple validation example - name must be at least 3 characters
    if (value.length > 0) {
      setIsNameValid(value.length >= 3);
    } else {
      setIsNameValid(undefined);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-display font-bold">New brief</h1>

      <div className="flex flex-row gap-18">
        <div className="flex flex-col gap-2 w-96">
          <h6 className="font-medium">Customization</h6>
          <Input
            type="text"
            value={briefName}
            onChange={handleNameChange}
            placeholder="Name"
            leftIcon={faUser}
            isValid={isNameValid === true}
            isInvalid={isNameValid === false}
            errorMessage={
              isNameValid === false
                ? "Name must be at least 3 characters"
                : undefined
            }
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h6 className="font-medium">Prompt</h6>
          <textarea
            className={cn(
              "w-full p-3 rounded-lg border bg-base-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "resize-y"
            )}
          />
        </div>
      </div>
    </>
  );
};

export default NewBriefPage;
