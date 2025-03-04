import { NextResponse } from "next/server";

export async function GET() {
  const prompt =
    "As an employee of Chaupal Company, suggest three key points the company should consider for improvement or growth. Provide actionable and practical suggestions. Separate each suggestion with '||'. The suggestions should reflect ideas such as enhancing team collaboration, improving customer satisfaction, or adopting new technologies.";

  try {
    const API_URL =
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"; // Use any HF model
    const API_KEY = process.env.HF_API_KEY;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    const data = await response.json();

    return NextResponse.json(
      { response: data[0]?.generated_text || "No response" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
