"use client";

import { MutableRefObject } from "react";

interface HeadlineProps {
  letterRefs: MutableRefObject<(HTMLSpanElement | null)[]>;
}

const HEADLINE = "WELCOME  ITZFIZZ";

export default function Headline({ letterRefs }: HeadlineProps) {
  const characters = HEADLINE.split("");

  return (
    <div
      className="absolute left-0 right-0 flex justify-center items-center"
      style={{
        top: "18%",
        gap: "6px",
        zIndex: 30,
        flexWrap: "wrap",
      }}
    >
      {characters.map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            letterRefs.current[i] = el;
          }}
          style={{
            fontSize: "clamp(1.4rem, 3.5vw, 3rem)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#555",
            opacity: 0.2,
            display: "inline-block",
            willChange: "opacity, color",
            minWidth: char === " " ? "1.2em" : undefined,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
