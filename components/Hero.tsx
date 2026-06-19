"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ShoppingBag } from "lucide-react";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function Hero() {
  return (
    <section className="overflow-hidden bg-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center md:text-left"
        >
          <motion.p
            variants={item}
            className="text-xs font-semibold uppercase tracking-widest text-accent"
          >
            New Arrivals
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-4 font-heading text-4xl font-semibold leading-tight text-ink sm:text-5xl md:text-6xl"
          >
            Step Into Glamour.
          </motion.h1>
          <motion.p variants={item} className="mt-4 max-w-md text-base text-muted sm:mx-0 sm:text-lg">
            Curated footwear, bags &amp; accessories — styled for you.
          </motion.p>
          <motion.div
            variants={item}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start"
          >
            <Link
              href="/shop"
              className="rounded-2xl bg-accent px-6 py-3 text-center text-sm font-semibold text-surface transition-transform hover:scale-[1.02]"
            >
              Shop Now
            </Link>
            <Link
              href="/shop?sort=new"
              className="rounded-2xl border border-line px-6 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              New Arrivals
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-accent-soft sm:h-80 sm:w-80">
            <div className="flex h-40 w-40 items-center justify-center rounded-2xl bg-surface shadow-sm sm:h-52 sm:w-52">
              <ShoppingBag className="text-accent" size={56} />
            </div>
            <div className="absolute -bottom-3 h-6 w-48 rounded-full bg-line/70 blur-sm sm:w-60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
