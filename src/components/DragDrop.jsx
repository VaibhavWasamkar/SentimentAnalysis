import { useState } from "react";

export default function DragBuckets({ dragAns, setDragAns }) {
  const items = [
    { id: "s1", text: "I love science projects!", label: "happy" },
    { id: "s2", text: "This homework is terrible.", label: "sad" },
    { id: "s3", text: "I will go outside.", label: "neutral" },
  ];

  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState([]);

  const start = (e, item) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  };

  const dropTo = (bucket, e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("text/plain"));

    setDragAns((prev) => {
      // Remove the item from any other bucket
      const cleared = Object.fromEntries(
        Object.entries(prev).map(([k, v]) => [
          k,
          v.filter((x) => x.id !== item.id),
        ])
      );

      // Replace any existing sentence in the target bucket
      return { ...cleared, [bucket]: [item] };
    });
  };

  const allow = (e) => e.preventDefault();

  const Bucket = ({ name, emoji }) => (
    <div
      onDrop={(e) => dropTo(name, e)}
      onDragOver={allow}
      style={{
        flex: 1,
        minHeight: 120,
        width: 150,
        background: "#f7f9fc",
        border: "2px dashed #90a4ae",
        borderRadius: 12,
        fontSize: 15,
        padding: 10,
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 6 }}>
        {emoji} {name.toUpperCase()}
      </div>
      <div style={{ margin: 0 }}>
        {dragAns[name].map((i) => (
          <p key={i.id}>{i.text}</p>
        ))}
      </div>
    </div>
  );

  const handleSubmit = () => {
    let correct = 0;
    const wrong = [];

    items.forEach((i) => {
      const foundBucket = Object.keys(dragAns).find((b) =>
        dragAns[b].some((x) => x.id === i.id)
      );
      if (foundBucket === i.label) correct += 1;
      else wrong.push({ question: i.text, correct: i.label });
    });

    setScore(correct);
    setWrongAnswers(wrong);
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div style={{ fontSize: 19 }}>
        <p style={{ fontSize: 30, fontWeight: 800 }}>
          🎉 You scored {score}/{items.length}!
        </p>
        {wrongAnswers.length > 0 && (
          <div style={{ marginTop: 12, justifyContent: "left", alignItems: "left", textAlign: "left" }}>
            <p style={{ fontWeight: 700 }}>❌ Sentences you placed incorrectly:</p>
            <ul>
              {wrongAnswers.map((w, i) => (
                <li key={i}>
                  {w.question} - Correct bucket: <b>{w.correct}</b>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );

  return (
    <div>
      <div style={{ display: "flex", gap: 10, margin: "10px auto" }}>
        {items.map((i) => (
          <div
            key={i.id}
            draggable
            onDragStart={(e) => start(e, i)}
            style={{
              background: "#e8eaf6",
              padding: "8px 10px",
              margin: "10px auto",
              fontSize: 19,
              borderRadius: 12,
              cursor: "grab",
            }}
          >
            {i.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12, margin: "10px auto" }}>
        <Bucket name="happy" emoji="😊" />
        <Bucket name="neutral" emoji="😐" />
        <Bucket name="sad" emoji="😢" />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          padding: "10px 16px",
          fontWeight: 700,
          borderRadius: 12,
          border: 0,
          background: "#7E57C2",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
}