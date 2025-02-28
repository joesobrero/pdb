"use client";

import Button from "@/app/components/interactive/button";
import { Brief } from "@/app/types/brief";
import { createClient } from "@/lib/supabase/client";
import { faPencil } from "@fortawesome/pro-regular-svg-icons";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyBrief = () => {
  const params = useParams();
  const briefId = params.id as string;
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchBrief = async () => {
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

        // Fetch the brief by ID
        const { data, error } = await supabase
          .from("briefs")
          .select("*")
          .eq("id", briefId)
          .eq("user_id", userData.id)
          .single();

        if (error) {
          throw error;
        }

        setBrief(data);
      } catch (err) {
        console.error("Error fetching brief:", err);
        setError(err instanceof Error ? err.message : "Failed to load brief");
      } finally {
        setLoading(false);
      }
    };

    if (briefId) {
      fetchBrief();
    }
  }, [briefId, supabase]);

  if (loading) {
    return <p className="text-muted">Loading brief...</p>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!brief) {
    return <p className="text-muted">Brief not found.</p>;
  }

  return (
    <>
      <div className="flex flex-row gap-2 justify-between">
        <h1 className="text-3xl font-medium font-display">{brief.name}</h1>
        <Button variant="subtle" iconLeft={faPencil}>
          Edit
        </Button>
      </div>
    </>
  );
};

export default MyBrief;
