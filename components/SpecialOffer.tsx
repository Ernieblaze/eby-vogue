"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function SpecialOffer() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-blush"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6">
        <Sparkles className="text-accent" size={28} />
        <h2 className="font-heading text-2xl font-semibold text-ink sm:text-3xl">
          Up to 50% Off Selected Styles
        </h2>
        <p className="max-w-md text-sm text-muted">
          Limited pieces, while stocks last. Message us on WhatsApp before your
          favourites are gone.
        </p>
        <Link
          href="/shop"
          className="mt-2 rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-surface transition-transform hover:scale-[1.02]"
        >
          Shop The Offer
        </Link>
      </div>
    </motion.section>
  );
}
