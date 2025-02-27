"use client";

import { createClient } from "@/lib/supabase/client";
import Button from "@/app/components/interactive/button";
import { faSignOut, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { useEffect, useState } from "react";

const AccountPage = () => {
  const supabase = createClient();
  const [email, setEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setEmail(data.user?.email ?? null);
      } catch (error) {
        console.error("Error fetching email:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmail();
  }, [supabase]);

  return (
    <>
      <h1 className="text-3xl font-display font-medium">Account</h1>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Email</p>
        <p className="font-medium">
          {isLoading ? <span className="text-muted">Loading...</span> : email}
        </p>
      </div>
      <div className="flex flex-row gap-2">
        <Button
          variant="subtle"
          iconLeft={faSignOut}
          onClick={() => supabase.auth.signOut()}
          className="w-fit"
        >
          Sign out
        </Button>
        <Button
          variant="destructive"
          iconLeft={faTrash}
          onClick={() => {}}
          className="w-fit"
        >
          Delete Account
        </Button>
      </div>
    </>
  );
};

export default AccountPage;
