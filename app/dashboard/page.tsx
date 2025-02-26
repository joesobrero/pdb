"use client";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function DashboardPage() {
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
    <div>
      <h1 className="text-3xl font-display font-bold">Feed</h1>
      <p className="text-muted">account: {user?.email}</p>
    </div>
  );
}
