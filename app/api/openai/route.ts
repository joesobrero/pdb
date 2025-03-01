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
    const { userMessage } = await request.json();

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
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional research assistant. " +
            "You will create a brief in the style of a daily presidential repoort based on the following instructions:" +
            "Pay close attention to the user's instructions and the content of the brief. " +
            "Do not include any other text or commentary than the brief itself. Do not include an introduction of any kind. Get straight to the content." +
            "Its extremely important that the brief is relevant to today's actual date, events of the past timeframe, and anticipated events of the future timeframe, where the timeframe is provided as the user message frequency." +
            "Based on the desired frequency, length, and tone, you will create a brief that is concise and to the point. " +
            "Avoid being generic and instead provide specific information and data to support the brief. ",
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
