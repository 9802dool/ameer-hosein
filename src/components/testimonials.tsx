"use client";

import { useState } from "react";
import Image from "next/image";
import { quotes, studentFilms } from "@content/testimonials";

const slides = [
  ...quotes.map((quote) => ({ kind: "quote" as const, quote })),
  ...studentFilms.map((film) => ({ kind: "film" as const, film })),
];

export function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  if (!slide) return null;

  return (
    <div>
      <div className="min-h-72 border border-line bg-panel p-6 md:p-10">
        {slide.kind === "quote" ? (
          <figure>
            <blockquote className="font-display text-3xl leading-tight md:text-5xl">
              “{slide.quote.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm text-muted">
              {slide.quote.name}
              {slide.quote.detail ? ` — ${slide.quote.detail}` : ""}
            </figcaption>
          </figure>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <Image
              src={slide.film.poster}
              alt={slide.film.posterAlt}
              width={1400}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div>
              <h3 className="font-display text-3xl">{slide.film.title}</h3>
              <p className="mt-3 text-muted">{slide.film.caption}</p>
              {slide.film.embedUrl ? (
                <iframe
                  className="mt-4 aspect-[9/16] w-full max-w-sm"
                  src={slide.film.embedUrl}
                  title={slide.film.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : null}
              {slide.film.mp4 ? (
                <video className="mt-4 w-full" controls poster={slide.film.poster}>
                  <source src={slide.film.mp4} />
                </video>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-muted">
          {index + 1} / {slides.length}
        </p>
        <div className="flex gap-2">
          <button className="min-h-11 border border-line px-4 text-sm" onClick={() => setIndex((value) => (value + slides.length - 1) % slides.length)}>
            Previous
          </button>
          <button className="min-h-11 border border-line px-4 text-sm" onClick={() => setIndex((value) => (value + 1) % slides.length)}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
