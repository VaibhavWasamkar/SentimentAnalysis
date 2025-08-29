import Sentiment from "sentiment";
const sentiment = new Sentiment();

export default function analyzeSentiment(text) {
  const result = sentiment.analyze(text || "");
  if (result.score > 0) return { label: "Positive", emoji: "😊" };
  if (result.score < 0) return { label: "Negative", emoji: "😢" };
  return { label: "Neutral", emoji: "😐" };
}
