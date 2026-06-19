"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "My heels arrived exactly as pictured and the WhatsApp ordering made it so easy. Will definitely order again.",
    name: "Chiamaka, Lagos",
  },
  {
    quote:
      "Eby Vogue has the most elegant pieces. The tote bag I got gets compliments every time I step out.",
    name: "Funmi, Abuja",
  },
  {
    quote:
      "Quick replies, genuine products, and delivery was faster than I expected. My go-to for accessories now.",
    name: "Ada, Port Harcourt",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
          What Customers Say
        </p>

        <div className="relative mt-8 flex min-h-44 items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              <Quote className="text-accent" size={24} />
              <p className="max-w-lg text-base text-ink sm:text-lg">
                &ldquo;{TESTIMONIALS[index].quote}&rdquo;
              </p>
              <p className="text-sm font-medium text-muted">{TESTIMONIALS[index].name}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => goTo(index - 1)}
            className="text-ink transition-colors hover:text-accent"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((testimonial, i) => (
              <button
                key={testimonial.name}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  i === index ? "bg-accent" : "bg-line"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => goTo(index + 1)}
            className="text-ink transition-colors hover:text-accent"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
