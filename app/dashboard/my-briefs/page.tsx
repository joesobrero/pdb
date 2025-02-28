"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import BriefPreview from "@/app/components/display/brief-preview";
import { Brief } from "@/app/types/brief";

const MyBriefsPage = () => {
  const [briefs, setBriefs] = useState<Brief[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchBriefs = async () => {
      try {
        // Get the current user
        const { data: sessionData } = await supabase.auth.getSession();

        if (!sessionData.session || !sessionData.session.user) {
          throw new Error("No user found. Please sign in again.");
        }

        // Get the user's ID from the users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("id")
          .eq("email", sessionData.session.user.email)
          .single();

        if (userError || !userData) {
          console.error("Error fetching user:", userError);
          throw new Error("Could not find your user profile.");
        }

        // Fetch the user's briefs
        const { data, error } = await supabase
          .from("briefs")
          .select("*")
          .eq("user_id", userData.id)
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setBriefs(data || []);
      } catch (err) {
        console.error("Error fetching briefs:", err);
        setError(err instanceof Error ? err.message : "Failed to load briefs");
      } finally {
        setLoading(false);
      }
    };

    fetchBriefs();
  }, [supabase]);

  return (
    <>
      <h1 className="text-3xl font-display font-medium">My briefs</h1>

      {loading && <p className="text-muted mt-4">Loading your briefs...</p>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      )}

      {!loading && !error && briefs.length === 0 && (
        <p className="text-muted mt-4">
          You haven&apos;t created any briefs yet.
        </p>
      )}

      {briefs.length > 0 && (
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
          {briefs.map((brief) => (
            <BriefPreview
              key={brief.id}
              id={brief.id}
              name={brief.name}
              frequency={brief.frequency ?? "daily"}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MyBriefsPage;
