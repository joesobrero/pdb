/**
 * Function to generate a report using OpenAI based on brief settings
 * @param templatePrompt The customized prompt template based on brief settings
 * @returns The generated report content and any potential errors
 */
export async function generateReport(
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
        userMessage: templatePrompt,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { content: "", error: data.error || "Failed to generate report" };
    }

    // Extract the content from the response
    const content = data.message.content || "";

    return { content };
  } catch (error) {
    console.error("Error generating report:", error);
    return {
      content: "",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
