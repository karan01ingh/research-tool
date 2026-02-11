export async function summarizeText(text) {
  const lower = text.toLowerCase();

  const positiveWords = ["growth", "increase", "improved", "strong", "optimistic", "profit"];
  const negativeWords = ["decline", "loss", "weak", "decrease", "challenge", "cost"];

  let positiveCount = 0;
  let negativeCount = 0;

  positiveWords.forEach(word => {
    if (lower.includes(word)) positiveCount++;
  });

  negativeWords.forEach(word => {
    if (lower.includes(word)) negativeCount++;
  });

  let tone = "neutral";
  if (positiveCount > negativeCount) tone = "optimistic";
  if (negativeCount > positiveCount) tone = "cautious";

  return {
    tone,
    confidence: "low",
    positives: [
      "Revenue or growth indicators mentioned",
      "Operational improvements noted"
    ],
    concerns: [
      "Cost or risk factors mentioned"
    ],
    forward_guidance: "Management expects continued performance based on transcript.",
    capacity_trend: "Not clearly specified.",
    growth_initiatives: [
      "Expansion or improvement initiatives mentioned"
    ]
  };
}
