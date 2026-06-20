"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { unsplashUrl } from "@/lib/unsplash";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const HERO_IMAGE = unsplashUrl("1483985988355-763728e1935b", 1200);

const TRUST_AVATARS = [
  unsplashUrl("1438761681033-6461ffad8d80", 80),
  unsplashUrl("1535713875002-d1d0cf377fde", 80),
  unsplashUrl("1544005313-94ddf0286df2", 80),
];

const WHATSAPP_LINK = buildWhatsAppLink(
  "Hi Eby Vogue Glamour, I'd like to know more about your footwear, bags & accessories."
);

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
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex flex-col-reverse md:min-h-[560px] md:flex-row md:items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="relative z-10 py-10 text-center md:w-[55%] md:py-0 md:text-left"
          >
            <motion.p
              variants={item}
              className="text-xs font-semibold uppercase tracking-widest text-accent"
            >
              New Arrivals
            </motion.p>
            <motion.h1
              variants={item}
              className="mt-4 font-heading text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl md:text-7xl"
            >
              Step Into
              <br />
              Glamour.
            </motion.h1>
            <motion.p
              variants={item}
              className="mx-auto mt-5 max-w-md text-base text-muted sm:text-lg md:mx-0"
            >
              Curated footwear, bags &amp; accessories — styled for you.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-center rounded-2xl bg-accent px-6 py-3 text-center text-sm font-semibold text-surface shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02]"
              >
                Order on WhatsApp
              </a>
              <Link
                href="/shop"
                className="flex min-h-11 items-center justify-center rounded-2xl border border-line bg-surface px-6 py-3 text-center text-sm font-semibold text-ink shadow-sm transition-colors hover:border-accent hover:text-accent"
              >
                Shop Now
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative -mx-4 h-72 w-[calc(100%+2rem)] overflow-hidden rounded-b-3xl sm:-mx-6 sm:h-96 sm:w-[calc(100%+3rem)] sm:rounded-3xl md:absolute md:inset-y-0 md:right-0 md:mx-0 md:h-full md:w-[52%] md:rounded-3xl"
          >
            <Image
              src={HERO_IMAGE}
              alt="Woman carrying curated shopping bags from Eby Vogue Glamour"
              fill
              priority
              sizes="(min-width: 768px) 52vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent md:bg-gradient-to-r md:from-bg/0 md:via-transparent md:to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-2xl bg-surface/95 px-4 py-3 shadow-lg backdrop-blur sm:right-auto sm:w-fit">
              <div className="flex -space-x-3">
                {TRUST_AVATARS.map((src, i) => (
                  <span
                    key={src}
                    className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-surface"
                    style={{ zIndex: TRUST_AVATARS.length - i }}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </span>
                ))}
              </div>
              <p className="text-xs font-medium text-ink sm:text-sm">
                Trusted by 100s of happy customers
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
