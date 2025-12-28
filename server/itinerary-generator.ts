import { callOpenAI } from "./llm";
import type { InsertItinerary } from "@shared/schema";

export async function generateItineraryPrompt(tripInfo: {
  title?: string;
  startDate?: string;
  endDate?: string;
  destination?: string;
  preferences?: any;
}): Promise<string> {
  const { title, startDate, endDate, destination, preferences } = tripInfo;

  let prompt = `Create a day-by-day itinerary for a trip`;
  if (title) prompt += ` called \"${title}\"`;
  if (destination) prompt += ` to ${destination}`;
  if (startDate && endDate) prompt += ` from ${startDate} to ${endDate}`;
  prompt += `.`;

  if (preferences) {
    prompt += ` The user's preferences: ${JSON.stringify(preferences)}.`;
  }

  prompt += ` Return the itinerary as JSON array of days. Each day should include a list of activities with title, start, end, location name, lat, lng, and an estimated cost. Output only JSON.`;

  return prompt;
}

export async function generateItinerary(tripInfo: {
  title?: string;
  startDate?: string;
  endDate?: string;
  destination?: string;
  preferences?: any;
}): Promise<InsertItinerary> {
  const prompt = await generateItineraryPrompt(tripInfo);
  const aiText = await callOpenAI(prompt, 1200);

  // Try to parse JSON from the assistant — be defensive
  let parsed: any = null;
  try {
    // Some LLM replies wrap JSON in markdown; strip code fences
    const cleaned = aiText?.trim().replace(/^```json\n?|\n?```$/g, "");
    parsed = JSON.parse(cleaned);
  } catch (err) {
    // if parsing failed, throw a descriptive error so caller can handle
    throw new Error(`Failed to parse itinerary JSON from LLM: ${String(err)} -- raw: ${String(aiText).slice(0, 200)}`);
  }

  // Create minimal InsertItinerary shape expected by storage
  const insert: any = {
    tripId: 0,
    day: 0,
    date: new Date().toISOString(),
    activities: parsed,
    notes: null,
  };

  return insert as InsertItinerary;
}
