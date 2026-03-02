# Scroll-Driven Hero Section Animation

A scroll-based hero section animation built with **Next.js**, **Tailwind CSS**, and **GSAP ScrollTrigger**.

## Reference

Inspired by: [https://paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation)

## Features

- **Initial load animation** — headline letters stagger-fade in, stat boxes slide up
- **Scroll-driven car animation** — McLaren 720S moves left to right tied to scroll progress
- **Expanding trail** — green trail grows behind the car as it moves
- **Letter reveal** — each headline letter lights up as the car passes it
- **Stat boxes** — 4 colored metric boxes fade in at staggered scroll intervals
- **Scroll lock** — page locks in place until the full animation completes

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [GSAP](https://gsap.com/) + ScrollTrigger

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    globals.css        # Brand colors + dark base styles
    layout.tsx
    page.tsx
  components/
    hero/
      HeroSection.tsx  # All GSAP animation logic
      HeroTrack.tsx    # Viewport-height container
      Road.tsx         # Dark road band
      Car.tsx          # McLaren PNG (scroll-animated)
      Trail.tsx        # Expanding green trail
      Headline.tsx     # Per-letter animated text
      StatBoxes.tsx    # 4 colored metric boxes
public/
  car-top-view.png     # McLaren 720S top-view image
```
