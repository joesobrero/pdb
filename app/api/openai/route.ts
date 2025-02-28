import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // Create Supabase client
    const supabase = await createClient();

    // Get user session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get user's API key from the database
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("openai_api_key")
      .eq("email", session.user.email)
      .single();

    if (userError || !userData) {
      console.error("Error fetching user:", userError);
      return NextResponse.json(
        { error: "Could not find user profile" },
        { status: 404 }
      );
    }

    if (!userData.openai_api_key) {
      return NextResponse.json(
        { error: "OpenAI API key not found in your profile" },
        { status: 400 }
      );
    }

    // Parse the request body
    const { promptTemplate, userMessage } = await request.json();

    if (!userMessage) {
      return NextResponse.json(
        { error: "User message is required" },
        { status: 400 }
      );
    }

    // Initialize OpenAI with the user's API key from the database
    const openai = new OpenAI({
      apiKey: userData.openai_api_key,
    });

    // Create the chat completion
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            promptTemplate ||
            `
            You are a professional research assistant. You are given a brief and a list of sources. You will create a report on topics provided in the style of a presidential daily briefing.
          `,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    // Return the response
    return NextResponse.json({
      message: {
        content: response.choices[0].message.content,
      },
    });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return NextResponse.json(
      { error: "Failed to get response from OpenAI" },
      { status: 500 }
    );
  }
}
