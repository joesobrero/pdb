/**
 * Function to generate a brief preview using OpenAI
 * @param templatePrompt The customized prompt template based on user selections
 * @returns The generated brief content
 */
export async function generateBriefPreview(
  templatePrompt: string
): Promise<{ content: string; error?: string }> {
  try {
    if (!templatePrompt) {
      return { content: "", error: "Template prompt is required" };
    }

    // Call the OpenAI API route
    const response = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promptTemplate:
          "You are a professional research assistant. You will create a brief based on the following instructions:",
        userMessage: templatePrompt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { content: "", error: data.error || "Failed to generate brief" };
    }

    // Extract the content from the response
    const content = data.message.content || "";

    return { content };
  } catch (error) {
    console.error("Error generating brief preview:", error);
    return {
      content: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
