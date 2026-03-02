"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import HeroTrack from "./HeroTrack";
import Road from "./Road";
import Car from "./Car";
import Trail from "./Trail";
import Headline from "./Headline";
import StatBoxes from "./StatBoxes";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TIMELINE_DURATION = 10;

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const roadRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLImageElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !carRef.current ||
        !trailRef.current
      )
        return;

      const carWidth = carRef.current.offsetWidth || 220;
      const endX = window.innerWidth - carWidth - 20;

      // ── Phase 1: Load-time animation ──────────────────────────────────
      const validLetters = letterRefs.current.filter(Boolean);
      const validBoxes = boxRefs.current.filter(Boolean);

      const loadTl = gsap.timeline({ delay: 0.2 });

      if (validLetters.length > 0) {
        loadTl.from(validLetters, {
          opacity: 0,
          y: 25,
          duration: 0.7,
          stagger: 0.04,
          ease: "power3.out",
        });
      }

      if (validBoxes.length > 0) {
        loadTl.from(
          validBoxes,
          {
            opacity: 0,
            y: 40,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // ── Phase 2 + 3 + 4: Scroll-driven timeline ───────────────────────
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=100%",       // 100vh of scroll space drives the animation
          pin: true,           // pin the section; no scrolling past until animation ends
          anticipatePin: 1,    // prevents jump when pinning starts
          scrub: 1.2,
        },
      });

      // Car moves left → right
      scrollTl.to(
        carRef.current,
        { x: endX, ease: "none", duration: TIMELINE_DURATION },
        0
      );

      // Trail expands behind car
      scrollTl.to(
        trailRef.current,
        { width: endX, ease: "none", duration: TIMELINE_DURATION },
        0
      );

      // Letters reveal as car passes their position
      letterRefs.current.forEach((letter) => {
        if (!letter) return;
        const letterLeft = letter.offsetLeft;
        // letterLeft is relative to Headline's parent; adjust to road-level x
        // We use the letter's getBoundingClientRect vs road's to get cross-element position
        const roadEl = roadRef.current;
        let adjustedLeft = letterLeft;
        if (roadEl) {
          const letterRect = letter.getBoundingClientRect();
          const roadRect = roadEl.getBoundingClientRect();
          adjustedLeft = letterRect.left - roadRect.left;
        }

        const revealTime = Math.max(
          0,
          Math.min((adjustedLeft / endX) * TIMELINE_DURATION, TIMELINE_DURATION - 0.1)
        );

        scrollTl.to(
          letter,
          { opacity: 1, color: "#ffffff", duration: 0.1, ease: "none" },
          revealTime
        );
      });

      // Stat boxes fade in at staggered scroll intervals
      const boxTimings = [0.18, 0.34, 0.52, 0.68];
      boxRefs.current.forEach((box, i) => {
        if (!box) return;
        scrollTl.to(
          box,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          boxTimings[i] * TIMELINE_DURATION
        );
      });

      // Refresh ScrollTrigger on resize
      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "100vh" }}
    >
      <HeroTrack>
        {/* Headline sits above the road */}
        <Headline letterRefs={letterRefs} />

        {/* Road contains Trail and Car */}
        <Road ref={roadRef}>
          <Trail ref={trailRef} />
          <Car ref={carRef} />
        </Road>

        {/* Stat boxes positioned at the 4 corners of the viewport */}
        <StatBoxes boxRefs={boxRefs} />
      </HeroTrack>
    </section>
  );
}
