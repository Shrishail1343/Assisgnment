"use client";

import { MutableRefObject } from "react";

interface StatBox {
  id: string;
  bgColor: string;
  textColor: string;
  value: string;
  label: string;
  position: React.CSSProperties;
}

const BOXES: StatBox[] = [
  {
    id: "box1",
    bgColor: "#def54f",
    textColor: "#111",
    value: "58%",
    label: "Increase in pick up point use",
    position: { top: "8%", left: "3%" },
  },
  {
    id: "box2",
    bgColor: "#6ac9ff",
    textColor: "#111",
    value: "23%",
    label: "Decreased in customer phone calls",
    position: { top: "8%", right: "3%" },
  },
  {
    id: "box3",
    bgColor: "#333333",
    textColor: "#fff",
    value: "27%",
    label: "Increase in pick up point use",
    position: { bottom: "8%", left: "3%" },
  },
  {
    id: "box4",
    bgColor: "#fa7328",
    textColor: "#111",
    value: "40%",
    label: "Decreased in customer phone calls",
    position: { bottom: "8%", right: "3%" },
  },
];

interface StatBoxesProps {
  boxRefs: MutableRefObject<(HTMLDivElement | null)[]>;
}

export default function StatBoxes({ boxRefs }: StatBoxesProps) {
  return (
    <>
      {BOXES.map((box, i) => (
        <div
          key={box.id}
          ref={(el) => {
            boxRefs.current[i] = el;
          }}
          style={{
            position: "absolute",
            ...box.position,
            backgroundColor: box.bgColor,
            color: box.textColor,
            padding: "16px 20px",
            borderRadius: "12px",
            minWidth: "180px",
            maxWidth: "220px",
            opacity: 0,
            transform: "translateY(40px)",
            zIndex: 40,
            willChange: "opacity, transform",
          }}
        >
          <div
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {box.value}
          </div>
          <div
            style={{
              fontSize: "0.78rem",
              marginTop: "6px",
              lineHeight: 1.3,
              fontWeight: 500,
            }}
          >
            {box.label}
          </div>
        </div>
      ))}
    </>
  );
}
