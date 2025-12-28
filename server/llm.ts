const OPENAI_URL = process.env.OPENAI_API_URL || "https://api.openai.com/v1";
const OPENAI_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_KEY) {
  console.warn("OPENAI_API_KEY not set — LLM features will fail if called");
}

export async function callOpenAI(prompt: string, maxTokens = 800) {
  if (!OPENAI_KEY) throw new Error("OPENAI_API_KEY not configured");

  const res = await fetch(`${OPENAI_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful itinerary planner." },
        { role: "user", content: prompt },
      ],
      max_tokens: maxTokens,
      temperature: 0.2,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenAI API error: ${res.status} ${text}`);
  }

  const data = await res.json();
  // Defensive: attempt to extract content
  const content = data?.choices?.[0]?.message?.content ?? data?.choices?.[0]?.text;
  return content;
}
