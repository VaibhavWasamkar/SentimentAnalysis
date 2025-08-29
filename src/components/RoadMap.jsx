import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Map, TreePine, Binoculars, BookOpen, MessageSquare, Sparkles, FlaskRound, Mountain, Puzzle, Crown } from "lucide-react";

function Roadmap({ totalSteps = 10, currentStep, showRoadmapOnly, onStepClick }) {
  const roadPath =
    "M100 700 Q300 500 500 600 T900 400 T1200 250 T1500 300 T1800 150";

  const colors = [
    "#6C63FF", "#00BCD4", "#FF7043", "#009688", "#8BC34A",
    "#7E57C2", "#00BCD4", "#FF7043", "#FFCA28", "#6C63FF",
  ];

  const icons = [
    Map, TreePine, Binoculars, BookOpen, MessageSquare,
    Sparkles, FlaskRound, Mountain, Puzzle, Crown,
  ];

  const svgRef = useRef(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    const updatePositions = () => {
      const path = svgRef.current.querySelector("path");
      const totalLength = path.getTotalLength();
      const pos = Array.from({ length: totalSteps }).map((_, i) => {
        const progress = i / (totalSteps - 1 || 1);
        return path.getPointAtLength(progress * totalLength);
      });
      setPositions(pos);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [totalSteps]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: showRoadmapOnly ? "all" : "none", // enable clicks only if showRoadmapOnly
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 2000 900"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <defs>
          <linearGradient id="roadGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6C63FF" />
            <stop offset="50%" stopColor="#00BFA6" />
            <stop offset="100%" stopColor="#FF4081" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Road paths */}
        <path
          d={roadPath}
          stroke="url(#roadGradient)"
          strokeWidth="55"
          fill="none"
          strokeLinecap="round"
          opacity="0.2"
          filter="url(#glow)"
        />
        <path
          d={roadPath}
          stroke="#fff"
          strokeWidth="12"
          fill="none"
          strokeDasharray="40,40"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Milestones */}
        {positions.map((p, i) => {
          const step = i + 1;
          const color = colors[i % colors.length];
          const Icon = icons[i % icons.length];
          const isActive = step === currentStep;

          return (
            <g
              key={i}
              transform={`translate(${p.x}, ${p.y})`}
              style={{ cursor: showRoadmapOnly ? "pointer" : "default" }}
              onClick={() => showRoadmapOnly && onStepClick && onStepClick(step)}
            >
              {isActive && (
                <motion.circle
                  r={60}
                  fill={color}
                  opacity={0.2}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              <motion.circle
                r={isActive ? 40 : 28}
                fill={color}
                stroke="#fff"
                strokeWidth={4}
                initial={{ opacity: 1 }}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <foreignObject x={-20} y={-20} width={40} height={40}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    transform: `scale(${isActive ? 1.2 : 1})`,
                    transition: "transform 0.3s ease",
                  }}
                >
                  <Icon size={24} />
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default Roadmap;
