"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { unsplashUrl } from "@/lib/unsplash";

const OFFER_IMAGE = unsplashUrl("1573408301185-9146fe634ad0", 700);

export function SpecialOffer() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-ink"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2">
        <div className="relative order-2 h-64 overflow-hidden rounded-2xl shadow-2xl sm:h-80 md:order-1">
          <Image
            src={OFFER_IMAGE}
            alt="Diamond bracelet, part of the limited-time offer"
            fill
            loading="lazy"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="order-1 text-center md:order-2 md:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Limited Time
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-surface sm:text-4xl">
            Up to 50% Off Selected Styles
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-surface/70 md:mx-0">
            Limited pieces, while stocks last. Message us on WhatsApp before
            your favourites are gone.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-ink shadow-lg shadow-accent/20 transition-transform hover:scale-[1.02]"
          >
            Shop The Offer
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
