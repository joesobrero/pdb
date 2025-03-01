import { createClient } from "@/lib/supabase/client";

/**
 * Function to save a report to the database
 * @param briefId The ID of the brief this report is associated with
 * @param content The content of the report
 * @param promptTemplate The prompt template used to generate the report
 * @param userMessage The user message used in the prompt
 * @param model The model used to generate the report (optional)
 * @returns Success status and any potential errors
 */
export async function saveReport(
  briefId: string | number,
  content: string,
  promptTemplate: string = "",
  userMessage: string = "",
  model: string = "gpt-4o-mini"
): Promise<{ success: boolean; error?: string; reportId?: number }> {
  const supabase = createClient();

  try {
    // Get the current user session
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session || !sessionData.session.user) {
      return {
        success: false,
        error: "No user found. Please sign in again.",
      };
    }

    // Get the user's ID from the users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("email", sessionData.session.user.email)
      .single();

    if (userError || !userData) {
      console.error("Error fetching user:", userError);
      return {
        success: false,
        error: "Could not find your user profile.",
      };
    }

    // Verify the brief exists and belongs to the user
    const { data: briefData, error: briefError } = await supabase
      .from("briefs")
      .select("id")
      .eq("id", briefId)
      .eq("user_id", userData.id)
      .single();

    if (briefError || !briefData) {
      console.error("Error verifying brief:", briefError);
      return {
        success: false,
        error: "Could not find the specified brief.",
      };
    }

    // Insert the report into the database
    const { data: reportData, error: insertError } = await supabase
      .from("reports")
      .insert({
        brief_id: briefId,
        content: content,
        prompt_template: promptTemplate,
        user_message: userMessage,
        model: model,
      })
      .select("id")
      .single();

    if (insertError) {
      console.error("Error saving report:", insertError);
      return {
        success: false,
        error: "Failed to save report content.",
      };
    }

    return {
      success: true,
      reportId: reportData?.id,
    };
  } catch (error) {
    console.error("Error saving report:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
