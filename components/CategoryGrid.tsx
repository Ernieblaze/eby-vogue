"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { unsplashUrl } from "@/lib/unsplash";

const CATEGORIES = [
  {
    slug: "footwear",
    label: "Footwear",
    image: unsplashUrl("1535043934128-cf0b28d52f95", 600),
  },
  {
    slug: "bags",
    label: "Bags",
    image: unsplashUrl("1584917865442-de89df76afd3", 600),
  },
  {
    slug: "accessories",
    label: "Accessories",
    image: unsplashUrl("1602173574767-37ac01994b2a", 600),
  },
];

export function CategoryGrid() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">
          Shop By Category
        </p>
        <h2 className="mt-2 text-center font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Find Your Style
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CATEGORIES.map(({ slug, label, image }) => (
            <Link
              key={slug}
              href={`/shop?category=${slug}`}
              className="group relative block h-64 overflow-hidden rounded-2xl shadow-md sm:h-80"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={image}
                  alt={`${label} from Eby Vogue Glamour`}
                  fill
                  loading="lazy"
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <p className="absolute bottom-5 left-5 font-heading text-2xl text-surface">
                {label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
