"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/auth-helpers-nextjs";
import Button from "@/app/components/interactive/button";
import { faSignOut, faTrash } from "@fortawesome/pro-regular-svg-icons";

const AccountPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, [supabase.auth]);

  return (
    <>
      <h1 className="text-3xl font-display font-medium">Account</h1>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Email</p>
        <p className="font-medium">{user?.email}</p>
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
