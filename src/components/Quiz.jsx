import { useState } from "react";
import analyzeSentiment from "../utils/sentiment";

const baseQs = [
  { text: "[1]. I just got a new puppy!", answer: "Positive" },
  { text: "[2]. Oh no, I lost my ice cream ", answer: "Negative" },
  { text: "[3]. I am eating my breakfast", answer: "Neutral" },
  { text: "[4]. Yay! It's my birthday today!", answer: "Positive" },
  { text: "[5]. I spilled juice on my homework", answer: "Negative" },
];

export default function Quiz({ mode = "default" }) {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const qs = baseQs;

  const handleAnswer = (choice) => {
    const expected =
      mode === "mcq"
        ? qs[current].answer
        : analyzeSentiment(qs[current].text).label;

    if (choice === expected) {
      setScore((s) => s + 1);
    } else {
      setWrongAnswers((prev) => [...prev, { question: qs[current].text, correct: expected }]);
    }

    if (current + 1 < qs.length) setCurrent((c) => c + 1);
    else setFinished(true);
  };

  if (finished)
    return (
      <div style={{ fontSize: 19 }}>
        <p style={{ fontSize: 20, fontWeight: 800 }}>🎉 You scored {score}/{qs.length}!</p>
        {wrongAnswers.length > 0 && (
          <div style={{ marginTop: 12, justifyContent: "left", alignItems: "left", textAlign: "left" }}>
            <p style={{ fontWeight: 700 }}>❌ Questions you got wrong:</p>
            <ul>
              {wrongAnswers.map((w, i) => (
                <li key={i}>
                  {w.question} - Correct answer: <b>{w.correct}</b>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );

  return (
    <div
      style={{
        background: "#fdfcff",
        border: "2px solid #ede7f6",
        borderRadius: 12,
        padding: 12,
        margin: "40px auto"
      }}
    >
      <p style={{ fontSize: 18}}>{qs[current].text}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {["Positive", "Neutral", "Negative"].map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            style={{
              background: "#7E57C2",
              color: "#fff",
              padding: "8px 12px",
              margin: "10px auto",
              border: "0",
              borderRadius: 12,
              fontWeight: 700,
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
