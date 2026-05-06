import { Groq } from "groq-sdk";

export type ListingAiResult = {
  title: string;
  description: string;
  type: string;
  quality: string;
  suggestedPrice: number | null;
  priceReason: string;
  reusableBiowaste: string[];
};

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

const extractJson = (text: string): ListingAiResult | null => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }

  try {
    return JSON.parse(text.slice(start, end + 1)) as ListingAiResult;
  } catch {
    return null;
  }
};

export const extractListingFromImage = async (
  imageDataUrl: string,
): Promise<ListingAiResult | null> => {
  if (!import.meta.env.VITE_GROQ_API_KEY) {
    return null;
  }

  const chatCompletion = await groq.chat.completions.create({
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    temperature: 0.2,
    max_completion_tokens: 512,
    top_p: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "You extract listing data from a biowaste photo. Reply with JSON only.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Return JSON with keys: title, description, type, quality, suggestedPrice, priceReason, reusableBiowaste (array of strings). Use PHP (Philippine Peso) for suggestedPrice.",
          },
          {
            type: "image_url",
            image_url: {
              url: imageDataUrl,
            },
          },
        ],
      },
    ],
  });

  const content = chatCompletion.choices[0]?.message?.content;
  if (!content) {
    return null;
  }

  return extractJson(content);
};
