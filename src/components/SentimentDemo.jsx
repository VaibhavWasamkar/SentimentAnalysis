import { useState } from "react";
import analyzeSentiment from "../utils/sentiment";
import { motion } from "framer-motion";

export default function SentimentDemo() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    const r = analyzeSentiment(text || "");
    setResult(r);
  };

  return (
    <div style={{display:"grid",gap:10}}>
      <textarea
        rows={3}
        placeholder="Type a sentence... e.g. I love ice cream 🍦"
        value={text}
        onChange={(e)=>setText(e.target.value)}
        style={{width:"94.5%",padding:12,borderRadius:12,border:"2px solid #c5cae9"}}
      />
      <button
        onClick={handleAnalyze}
        style={{background:"#6C63FF",color:"#fff",padding:"10px 14px",border:"0",borderRadius:12,fontWeight:700}}
      >
        Analyze
      </button>

      {result && (
        <motion.div
          initial={{scale:0.9,opacity:0}}
          animate={{scale:1,opacity:1}}
          transition={{duration:0.25}}
          style={{fontSize:18,fontWeight:800,color:"#5e35b1"}}
        >
          Sentiment: {result.emoji} {result.label}
        </motion.div>
      )}
    </div>
  );
}
