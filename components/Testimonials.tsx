"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { unsplashUrl } from "@/lib/unsplash";

const TESTIMONIALS = [
  {
    quote:
      "My heels arrived exactly as pictured and the WhatsApp ordering made it so easy. Will definitely order again.",
    name: "Chiamaka, Port Harcourt",
    avatar: unsplashUrl("1438761681033-6461ffad8d80", 80),
  },
  {
    quote:
      "Eby Vogue has the most elegant pieces. The tote bag I got gets compliments every time I step out.",
    name: "Funmi, Abuja",
    avatar: unsplashUrl("1544005313-94ddf0286df2", 80),
  },
  {
    quote:
      "Quick replies, genuine products, and delivery was faster than I expected. My go-to for accessories now.",
    name: "Ada, Port Harcourt",
    avatar: unsplashUrl("1500648767791-00dcc994a43e", 80),
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const goTo = (next: number) => {
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
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
              <div className="flex items-center gap-3">
                <span className="relative h-9 w-9 overflow-hidden rounded-full">
                  <Image
                    src={TESTIMONIALS[index].avatar}
                    alt=""
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </span>
                <p className="text-sm font-medium text-muted">{TESTIMONIALS[index].name}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => goTo(index - 1)}
            className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-accent"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex">
            {TESTIMONIALS.map((testimonial, i) => (
              <button
                key={testimonial.name}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className="flex h-11 w-7 items-center justify-center"
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === index ? "bg-accent" : "bg-line"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => goTo(index + 1)}
            className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-accent"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
