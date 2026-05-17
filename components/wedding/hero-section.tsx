"use client";

import { useEffect, useState } from "react";
import { FloralDecoration } from "./floral-decoration";

const WEDDING_DATE = new Date("2026-08-15T16:00:00-03:00"); // Argentina UTC-3

function calculateTimeLeft() {
  const difference = WEDDING_DATE.getTime() - Date.now();
  if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export function HeroSection() {
  const [timeLeft, setTimeLeft] = useState<ReturnType<
    typeof calculateTimeLeft
  > | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(calculateTimeLeft());
    const timeout = setTimeout(tick, 0); // primer tick async
    const interval = setInterval(tick, 1000); // siguientes cada segundo
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const units: Array<{ value: number | null; label: string }> = [
    { value: timeLeft?.days ?? null, label: "Días" },
    { value: timeLeft?.hours ?? null, label: "Horas" },
    { value: timeLeft?.minutes ?? null, label: "Min" },
    { value: timeLeft?.seconds ?? null, label: "Seg" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden bg-background">
      {/* Decorative florals */}
      <FloralDecoration className="absolute -top-12 -left-12 w-48 md:w-72 h-auto opacity-40 pointer-events-none" />
      <FloralDecoration className="absolute -bottom-12 -right-12 w-48 md:w-72 h-auto opacity-40 rotate-180 pointer-events-none" />

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <p className="text-xl md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-8">
          ¡Nos casamos!
        </p>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-foreground mb-6">
          <span className="block">Coni</span>
          <span className="text-3xl md:text-4xl lg:text-5xl text-primary mx-4">
            &
          </span>
          <span className="block">Nico</span>
        </h1>

        <div className="w-24 h-px bg-primary mx-auto my-8" />

        <p className="font-serif text-2xl md:text-2xl text-foreground/80 mb-4">
          15 de Agosto, 2026
        </p>
        <p className="font-serif text-xl md:text-2xl text-foreground/80 mb-4">
          Tucumán, Argentina
        </p>

        <p className="text-base md:text-lg text-muted-foreground italic max-w-lg mx-auto leading-relaxed mb-10">
          <br />
          Andábamos sin buscarnos pero sabiendo que andábamos para encontrarnos... <br />
        </p>

        {/* Countdown */}
        <div
          className="flex justify-center gap-4 md:gap-8 mb-12"
          aria-label="Cuenta atrás hasta la boda"
          suppressHydrationWarning
        >
          {units.map((unit) => (
            <div key={unit.label} className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-card border border-border flex items-center justify-center mb-2">
                <span className="font-serif text-2xl md:text-3xl text-foreground tabular-nums">
                  {unit.value ?? "—"}
                </span>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#rsvp"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium tracking-wide rounded-sm hover:bg-primary/90 transition-colors"
          >
            Confirma tu asistencia
          </a>
        </div> */}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
