"use client";

import Button from "@/app/components/interactive/button";
import { Brief as BriefType } from "@/app/types/brief";
import { createClient } from "@/lib/supabase/client";
import { faBolt, faPencil, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BriefDisplay from "@/app/components/display/brief";
import toast, { Toaster } from "react-hot-toast";
import { generateBriefPreview } from "../../new-brief/generate-preview";

const MyBrief = () => {
  const params = useParams();
  const briefId = params.id as string;
  const [brief, setBrief] = useState<BriefType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
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
        if (data.content) {
          setGeneratedContent(data.content);
        }
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

  const handleGenerate = async () => {
    if (!brief) return;

    setIsGenerating(true);

    try {
      // Create the prompt template from brief data
      const topicsString =
        brief.topics && brief.topics.length > 0
          ? `[${brief.topics.join(", ")}]`
          : "[topics]";

      const sourcesString =
        brief.sources && brief.sources.length > 0
          ? `[${brief.sources.join(", ")}]`
          : "[acceptable sources]";

      const restrictedSourcesString =
        brief.restricted_sources && brief.restricted_sources.length > 0
          ? `[${brief.restricted_sources.join(", ")}]`
          : "[restricted sources]";

      const targetAudienceText = brief.target_audience
        ? `[${brief.target_audience}]`
        : "[target audience]";

      const toneText = `[${brief.tone || "professional"}]`;
      const frequencyText = `[${brief.frequency || "weekly"}]`;
      const lengthText = `[${brief.length || "concise"}]`;

      // Format the prompt with highlighted variables
      const templatePrompt =
        `Write a ${frequencyText} newsletter aimed at ${targetAudienceText} that covers ${topicsString} in a ${toneText} manner. Start with a brief, engaging introduction, ` +
        `then dive into key points or sections with actionable insights and analysis. ` +
        `Include relevant data or quotes from sources like ${sourcesString} and avoid sources like ${restrictedSourcesString} ` +
        `and provide clear examples, statistics, and inforgraphics where appropriate. ` +
        `Conclude with a compelling concise summary. ` +
        `Ensure the overall content is ${lengthText}.`;

      // Generate the brief content
      const result = await generateBriefPreview(templatePrompt);

      if (result.error) {
        toast.error(result.error, {
          duration: 4000,
          style: {
            background: "#FEE2E2",
            color: "#B91C1C",
            border: "1px solid #F87171",
          },
        });
      } else {
        setGeneratedContent(result.content);

        // Update the brief in the database with the generated content
        const { error: updateError } = await supabase
          .from("briefs")
          .update({ content: result.content })
          .eq("id", briefId);

        if (updateError) {
          console.error("Error updating brief:", updateError);
          toast.error("Generated content could not be saved", {
            duration: 4000,
            style: {
              background: "#FEE2E2",
              color: "#B91C1C",
              border: "1px solid #F87171",
            },
          });
        } else {
          toast.success("Brief generated and saved successfully!", {
            duration: 3000,
            style: {
              background: "#ECFDF5",
              color: "#065F46",
              border: "1px solid #6EE7B7",
            },
          });
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage, {
        duration: 4000,
        style: {
          background: "#FEE2E2",
          color: "#B91C1C",
          border: "1px solid #F87171",
        },
      });
    } finally {
      setIsGenerating(false);
    }
  };

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
      <Toaster
        position="top-right"
        toastOptions={{
          className: "rounded-md shadow-md",
          duration: 3000,
        }}
      />

      <div className="flex flex-row gap-2 justify-between mb-6">
        <h1 className="text-3xl font-medium font-display">{brief.name}</h1>
        <div className="flex flex-row gap-2">
          <Button variant="subtle" iconLeft={faPencil}>
            Edit
          </Button>
          <Button variant="destructive" iconLeft={faTrash} />
          <Button
            iconLeft={faBolt}
            onClick={handleGenerate}
            loading={isGenerating}
          >
            Generate
          </Button>
        </div>
      </div>

      {/* Brief details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="col-span-1">
          <h2 className="text-lg font-medium mb-2">Details</h2>
          <div className="bg-base-100 p-4 rounded-lg border">
            <p>
              <strong>Frequency:</strong> {brief.frequency}
            </p>
            <p>
              <strong>Length:</strong> {brief.length}
            </p>
            <p>
              <strong>Tone:</strong> {brief.tone}
            </p>
            {brief.target_audience && (
              <p>
                <strong>Target Audience:</strong> {brief.target_audience}
              </p>
            )}
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-lg font-medium mb-2">Topics</h2>
          <div className="bg-base-100 p-4 rounded-lg border">
            {brief.topics && brief.topics.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {brief.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="bg-primary-100 text-primary-700 px-2 py-1 rounded-md text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-muted">No topics specified</p>
            )}
          </div>
        </div>
      </div>

      {/* Generated content */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">Generated Content</h2>
        <BriefDisplay
          content={
            isGenerating
              ? "Generating..."
              : generatedContent ||
                "Click 'Generate' to create content for this brief."
          }
        />
      </div>
    </>
  );
};

export default MyBrief;
