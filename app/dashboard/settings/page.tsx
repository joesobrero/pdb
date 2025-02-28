"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Input from "@/app/components/interactive/input";
import Button from "@/app/components/interactive/button";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/pro-regular-svg-icons";

const SettingsPage = () => {
  const supabase = createClient();

  const [openaiApiKey, setOpenaiApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showOpenaiApiKey, setShowOpenaiApiKey] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const fetchOpenaiApiKey = async () => {
      try {
        const { data } = await supabase.auth.getUser();

        if (data.user) {
          // Fetch the user's profile from the database
          const { data: userData, error } = await supabase
            .from("users")
            .select("openai_api_key")
            .eq("email", data.user.email)
            .single();

          if (error) {
            console.error("Error fetching user data:", error);
          } else {
            setOpenaiApiKey(userData?.openai_api_key || null);
          }
        }
      } catch (error) {
        console.error("Error fetching openai api key:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpenaiApiKey();
  }, [supabase]);

  const saveOpenaiApiKey = async () => {
    try {
      setIsSaving(true);
      setSaveSuccess(false);

      const { data: userData } = await supabase.auth.getUser();

      if (!userData.user) {
        console.error("No user found");
        return;
      }

      const { error } = await supabase
        .from("users")
        .update({ openai_api_key: openaiApiKey })
        .eq("email", userData.user.email);

      if (error) {
        console.error("Error saving OpenAI API key:", error);
      } else {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error saving OpenAI API key:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-display font-medium">Settings</h1>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">OpenAI API key</p>
        <div className="flex flex-row gap-2">
          <Input
            type={showOpenaiApiKey ? "text" : "password"}
            value={openaiApiKey ?? ""}
            onChange={(e) => setOpenaiApiKey(e.target.value)}
            placeholder="OpenAI API key"
            rightIcon={showOpenaiApiKey ? faEye : faEyeSlash}
            rightIconAction={() => setShowOpenaiApiKey(!showOpenaiApiKey)}
          />
          <Button
            variant="subtle"
            iconLeft={faCheck}
            className="w-48"
            onClick={saveOpenaiApiKey}
            loading={isSaving}
            disabled={isLoading}
          >
            {saveSuccess ? "Saved!" : "Save"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
