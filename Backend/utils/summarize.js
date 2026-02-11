// export async function summarizeText(text) {
//   const lower = text.toLowerCase();

//   const positiveWords = ["growth", "increase", "improved", "strong", "optimistic", "profit"];
//   const negativeWords = ["decline", "loss", "weak", "decrease", "challenge", "cost"];

//   let positiveCount = 0;
//   let negativeCount = 0;

//   positiveWords.forEach(word => {
//     if (lower.includes(word)) positiveCount++;
//   });

//   negativeWords.forEach(word => {
//     if (lower.includes(word)) negativeCount++;
//   });

//   let tone = "neutral";
//   if (positiveCount > negativeCount) tone = "optimistic";
//   if (negativeCount > positiveCount) tone = "cautious";

//   return {
//     tone,
//     confidence: "low",
//     positives: [
//       "Revenue or growth indicators mentioned",
//       "Operational improvements noted"
//     ],
//     concerns: [
//       "Cost or risk factors mentioned"
//     ],
//     forward_guidance: "Management expects continued performance based on transcript.",
//     capacity_trend: "Not clearly specified.",
//     growth_initiatives: [
//       "Expansion or improvement initiatives mentioned"
//     ]
//   };
// }
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function summarizeText(text) {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a financial analyst. Summarize earnings call transcripts into structured sections.",
      },
      {
        role: "user",
        content: `Summarize this transcript:

${text}

Return JSON with:
tone
confidence
positives
concerns
forward_guidance
capacity_trend
growth_initiatives`,
      },
    ],
  });

  const output = response.choices[0].message.content;

  return {
    ai_summary: output,
  };
}
