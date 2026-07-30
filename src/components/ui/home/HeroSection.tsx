import { useEffect, useRef, useState } from "react";

import image1 from "../../../assets/images/aslide1.jpg";
import image2 from "../../../assets/images/aslide2.jpg";
import image3 from "../../../assets/images/aslide3.jpg";

interface Slide {
  image: string;
  title: string;
}

const SLIDES: Slide[] = [
  {
    image: image1,
    title: "Generation of Trust",
  },
  {
    image: image2,
    title: "Retailers and Wholesalers",
  },
  {
    image: image3,
    title: "Best from nature at your service",
  },
];

// ms each slide stays before advancing
const SLIDE_DURATION = 3000;

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
  };

  useEffect(() => {
    startTimer();

    return () => stopTimer();
  }, [index]);

  const goTo = (i: number) => setIndex(i);

  return (
    <section className="relative w-full h-110 md:h-170 overflow-hidden bg-black">
      {/* Scoped animation keyframes */}
      <style>{`
        @keyframes bloomInImage {
          0% {
            opacity: 0;
            transform: scale(1.35);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bloomOutText {
          0% {
            opacity: 0;
            transform: scale(0.55);
            letter-spacing: -0.04em;
            filter: blur(6px);
          }
          55% {
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: scale(1);
            letter-spacing: normal;
            filter: blur(0px);
          }
        }
        .animate-bloom-in-image {
          animation: bloomInImage 2.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-bloom-out-text {
          animation: bloomOutText 1.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }
        .font-hero {
          font-family: "Playfair Display", "Times New Roman", serif;
          font-style: italic;
        }
      `}</style>

      {SLIDES.map((slide, i) =>
        i === index ? (
          <div key={i} className="absolute inset-0">
            {/* Image layer — blooms inward (zoom settles from large to normal) */}
            <div
              key={`img-${i}`}
              className="absolute inset-0 animate-bloom-in-image"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black/70" />

            {/* Text layer — blooms outward (expands from small to full) */}
            <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
              <h1
                key={`title-${i}`}
                className="font-hero animate-bloom-out-text text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight"
              >
                {slide.title}
              </h1>
            </div>
          </div>
        ) : null,
      )}

      {/* Dots navigation */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full border border-white transition-all duration-300 ${
              i === index ? "bg-white scale-110" : "bg-transparent"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
