import { useMemo, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import DragBuckets from "../components/DragDrop";
import SentimentDemo from "../components/SentimentDemo";
import Roadmap from "../components/RoadMap";
import Quiz from "../components/Quiz";

/* ---------- Slide Transition Variants ---------- */
const slideVariants = {
  enter: (dir) => {
    if (dir === null) {
      return { x: 0, opacity: 0, transition: { duration: 0.45 } };
    }
    return {
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.45 },
    };
  },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.45 },
  },
  exit: (dir) => {
    if (dir === null) {
      return { x: 0, opacity: 0, transition: { duration: 0.45 } };
    }
    return {
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.45 },
    };
  },
};

/* ---------- Slide Component ---------- */
function Slide({
  title,
  children,
  accent = "#6C63FF",
  image,
  direction,
  fullWidth = false,
  customButton = null,
}) {
  return (
    <motion.div
      key={title}
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(1px)",
        borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        maxWidth: "900px",
        maxHeight: "450px",
        margin: "0 auto",
        padding: "20px 24px",
        border: `3px solid ${accent}`,
        display: "grid",
        gridTemplateColumns: fullWidth ? "1fr" : "1fr 1.5fr",
        gap: fullWidth ? "0px" : "20px",
        alignItems: "stretch",
        overflow: "hidden",
      }}
    >
      {!fullWidth && (
        <div
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {image ? (
            <img
              src={image}
              alt="story art"
              style={{
                width: "450px",
                maxHeight: "450px",
                objectFit: "contain",
                border: "0",
                borderRadius: 16,
              }}
            />
          ) : (
            <div style={{ fontSize: 80 }}></div>
          )}
        </div>
      )}

      {/* Right content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: fullWidth ? "center" : "flex-start",
          textAlign: fullWidth ? "center" : "left",
        }}
      >
        {title && (
          <h3 style={{ fontSize: 32, marginBottom: 16, color: accent }}>
            {title}
          </h3>
        )}
        <div style={{ fontSize: 19, color: "#37474f", lineHeight: 1.6 }}>
          {children}
        </div>
        {customButton && <div style={{ marginTop: 20 }}>{customButton}</div>}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { step } = useParams();
  const navigate = useNavigate();
  const idx = Math.max(1, Math.min(15, Number(step || 0)));

  const [direction, setDirection] = useState(null);
  const [dragAns, setDragAns] = useState({
    happy: [],
    neutral: [],
    sad: [],
  });

  const go = (n, dirOverride = null) => {
    if (dirOverride !== null) {
      setDirection(dirOverride);
    } else {
      setDirection(n > idx ? 1 : -1);
    }
    navigate(`/${n}`);
  };

  /* ---------- Story Pages ---------- */
  const pages = useMemo(
    () => [
      // Intro to Website
      <Slide
        key="0"
        title="Welcome to Sentiment Analysis"
        accent="#FFB300"
        direction={direction}
        fullWidth
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <p className="text-lg">
            A fun way to learn how computers can <b>read emotions</b> in text!
          </p>
          <p className="text-lg">
            In this story, you’ll join <b>Koel</b> and <b>Bhalu</b> to discover -
            <br />How machines detect <b>happy</b>, <b>sad</b>, or <b>neutral</b> feelings.
          </p>
          <p className="text-lg">
            Get ready to <b>play quizzes</b>, <b>drag & drop challenges</b>, and see how computers think!
          </p>
          <h1>😐😞😃😢😡</h1>
          <button
            onClick={() => go(2, 1)}
            style={{
              padding: "12px 20px",
              background: "#6C63FF",
              color: "#fff",
              fontWeight: 700,
              borderRadius: 12,
              border: "0",
              cursor: "pointer",
              fontSize: 18,
              marginBottom: "40px",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#5548e3";
              e.target.style.transform = "translateY(-1px) scale(1.05)";
              e.target.style.boxShadow = "0 6px 14px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#6C63FF";
              e.target.style.transform = "translateY(1px) scale(1)";
              e.target.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
            }}
          >
            Start Story
          </button>
        </div>
      </Slide>,

      // Story: 1
      <Slide
        key="1"
        title="Meet the Adventurers"
        accent="#6C63FF"
        image="/Slide1.png"
        direction={direction}
      >
        <p>
          <b>Koel 🐦‍⬛:</b> Hi Bhalu! I love singing songs, but I don’t
          understand feelings in text. Can you help me?
        </p>
        <p>
          <b>Bhalu 🐻:</b> Of course, Koel! Let’s go on an adventure to learn
          about <b>Sentiment Analysis</b>.
        </p>
      </Slide>,

      // Story: 2
      <Slide
        key="2"
        title="Enter the World of Emotions"
        accent="#00BCD4"
        image="/Slide2.png"
        direction={direction}
      >
        <p>
          <b>Koel 🐦‍⬛:</b> People talk in words… but how do we know their
          feelings?
        </p>
        <p>
          <b>Bhalu 🐻:</b> Sentences can be <b>happy</b>, <b>sad</b>, or{" "}
          <b>neutral</b>.
        </p>
        <ul style={{ fontSize: 16 }}>
          <li>"I love ice cream" → 😊 Happy</li>
          <li>"I hate homework" → 😢 Sad</li>
          <li>"I am going to school" → 😐 Neutral</li>
        </ul>
      </Slide>,

      // Story: 3
      <Slide
        key="3"
        title="Why Emotions Matter"
        accent="#FF7043"
        image="/Slide3.png"
        direction={direction}
      >
        <p>
          <b>Koel 🐦‍⬛:</b> Bhalu, why is it so important to know the feelings in
          words? Isn’t reading the words enough?
        </p>
        <p>
          <b>Bhalu 🐻:</b> Koel! If we know feelings, we can help friends who are sad, understand stories better,
          and even make learning games more fun!
        </p>
        <p>
          <b>Koel 🐦‍⬛:</b> Wow! So emotions make words more colorful, like a rainbow.
        </p>
      </Slide>,

      // Story: 4
      <Slide
        key="4"
        title="First Challenge: Quiz Time!"
        accent="#009688"
        direction={direction}
        fullWidth
      >
        <p>
          <b>Question:</b> What emotion is in this sentence?
        </p>
        <Quiz mode="mcq" />
      </Slide>,

      // Story: 5
      <Slide
        key="5"
        title="How Computers Read Feelings"
        accent="#8BC34A"
        image="/Slide5.png"
        direction={direction}
      >
        <p>
          <b>Koel 🐦‍⬛:</b> How can a <i>computer</i> know feelings?
        </p>
        <p>
          <b>Bhalu 🐻:</b> Simple! Computers keep a <b>word list</b>.
        </p>
        <ul>
          <li>
            <i>great, love, awesome</i> → add positive points 😊
          </li>
          <li>
            <i>bad, hate, terrible</i> → add negative points 😢
          </li>
        </ul>
        <p>Then they add them up → overall feeling!</p>
      </Slide>,

      // Story: 6
      <Slide
        key="6"
        title="Koel’s Big Question"
        accent="#7E57C2"
        image="/Slide6.png"
        direction={direction}
      >
        <p>
          <b>Koel 🐦‍⬛:</b> Hey Bhalu! If I type a sentence, can a computer actually feel it?
        </p>
        <p>
          <b>Bhalu 🐻:</b> Haha, not exactly “feel,” Koel! But it can understand the mood, like a little emotions detective.
        </p>
        <p>
          <b>Koel 🐦‍⬛:</b> Wow! So it’s like magic, turning words into feelings?
        </p>
        <p>
          <b>Bhalu 🐻:</b> Exactly! Let’s explore together!
        </p>
      </Slide>,

      // Story: 7
      <Slide
        key="7"
        title="Try It Yourself!"
        accent="#00BCD4"
        image="/Slide7.png"
        direction={direction}
      >
        <p>Type your own sentence and see if Koel & Bhalu can guess the mood:</p>
        <div style={{ marginTop: 12 }}>
          <SentimentDemo />
        </div>
      </Slide>,

      // Story: 8
      <Slide
        key="8"
        title="Tricky Paths & Puzzles"
        accent="#FF7043"
        image="/Slide8.png"
        direction={direction}
      >
        <p>
          <b>Koel 🐦‍⬛:</b> But some sentences are tricky!
        </p>
        <p>
          <b>Bhalu 🐻:</b> You’re right! Computers sometimes get confused too! <br />Example: “Not bad at all!” → That’s{" "}
          <b>positive</b> 😊
        </p>
        <p>
          <b>Koel 🐦‍⬛:</b> But how do we make computers smarter?
        </p>
        <p>
          <b>Bhalu 🐻:</b> By training them with <b>lots</b> of examples!
        </p>
      </Slide>,

      // Story: 9
      <Slide
        key="9"
        title="Drag & Drop Challenge"
        accent="#FFCA28"
        direction={direction}
        fullWidth
      >
        <p>Drag each sentence into the right emotion box:</p>
        <DragBuckets dragAns={dragAns} setDragAns={setDragAns} />
      </Slide>,

      // Story: 10
      <Slide
        key="10"
        title="The Champion of Feelings!"
        accent="#6C63FF"
        image="/Slide10.png"
        direction={direction}
      >
        <p>
          <b>Koel 🐦‍⬛:</b> Wow Bhalu, I learned so much!
        </p>
        <p>
          <b>Bhalu 🐻:</b> You’re almost an expert, Koel!
        </p>
        <p>
          <b>Koel 🐦‍⬛:</b> Hooray! I can now understand feelings in text 🎊
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <Link
            to="/2"
            style={{
              background: "#6C63FF",
              color: "#fff",
              padding: "10px 14px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 700,
              margin: "20px Auto",
            }}
          >
            Restart Story
          </Link>
        </div>
      </Slide>,
    ],
    [dragAns, direction]
  );

  const roadmapSteps = pages.length - 1; // Remove intro from roadmap count
  const roadmapIndex = idx > 1 ? idx - 1 : 0; // Shift index (intro = 0)
  const [showRoadmapOnly, setShowRoadmapOnly] = useState(false);

  useEffect(() => {
    if (idx === 1) {
      setShowRoadmapOnly(false);
    }
  }, [idx]);

  return (
    <div
      className="page"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 🔹 Blur Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgb(255, 247, 214) 0%, rgb(230, 240, 255) 100%)",
          backdropFilter: "blur(8px)",
          opacity: 0.8,
          zIndex: 0,
        }}
      />

      {/* 🔹 Snake Roadmap (HIDE on Intro) */}
      {idx > 1 && <Roadmap
        totalSteps={roadmapSteps}
        currentStep={roadmapIndex}
        showRoadmapOnly={showRoadmapOnly}
        onStepClick={(step) => {
          setShowRoadmapOnly(false);
          go(step + 1);
        }}
      />}

      {/* 🔹 Slides */}
      {!showRoadmapOnly && (
        <div>
          <div
            style={{
              position: "relative",
              width: "940px",
              zIndex: 1,
              marginTop: "-65px",
            }}
          >
            <AnimatePresence mode="wait">{pages[idx - 1]}</AnimatePresence>

            {/* Prev Button */}
            {idx !== 1 && (
              <button
                onClick={() => go(Math.max(0, idx - 1))}
                disabled={idx === 2}
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "20px",
                  transform: "translateY(-50%)",
                  opacity: idx === 2 ? 0.4 : 1,
                  cursor: idx === 2 ? "not-allowed" : "pointer",
                  background: `${pages[idx - 1].props.accent}`,
                  color: "#fff",
                  padding: "14px",
                  border: "3px solid white",
                  borderRadius: "50%",
                  fontWeight: 700,
                  fontSize: "25px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronLeft size={28} /> {/* Attractive Icon */}
              </button>
            )}

            {/* Next Button */}
            {idx !== 1 && (
              <button
                onClick={() => go(Math.min(pages.length, idx + 1))}
                disabled={idx === pages.length}
                style={{
                  position: "fixed",
                  top: "50%",
                  right: "20px",
                  transform: "translateY(-50%)",
                  opacity: idx === pages.length ? 0.4 : 1,
                  cursor: idx === pages.length ? "not-allowed" : "pointer",
                  background: `${pages[idx - 1].props.accent}`,
                  color: "#fff",
                  padding: "14px",
                  border: "3px solid white",
                  borderRadius: "50%",
                  fontWeight: 700,
                  fontSize: "25px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ChevronRight size={28} /> {/* Attractive Icon */}
              </button>
            )}
          </div>
        </div>
      )}
      {/* Roadmap Btn */}
      {idx > 1 && idx < pages.length + 1 && (
        <div
          onClick={() => setShowRoadmapOnly(!showRoadmapOnly)}
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#6C63FF",
            fontWeight: 700,
            fontSize: "20px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#003366";
            e.target.style.transform = "translateX(-50%) scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.color = "#6C63FF";
            e.target.style.transform = "translateX(-50%) scale(1)";
          }}
        >
          {showRoadmapOnly ? "View Slide" : "View Map"}
        </div>
      )}
    </div>
  );
}