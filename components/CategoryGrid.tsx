"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Footprints, Briefcase, Gem } from "lucide-react";

const CATEGORIES = [
  { slug: "footwear", label: "Footwear", icon: Footprints },
  { slug: "bags", label: "Bags", icon: Briefcase },
  { slug: "accessories", label: "Accessories", icon: Gem },
];

export function CategoryGrid() {
  return (
    <section className="bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">
          Shop By Category
        </p>
        <h2 className="mt-2 text-center font-heading text-3xl font-semibold text-ink sm:text-4xl">
          Find Your Style
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {CATEGORIES.map(({ slug, label, icon: Icon }) => (
            <Link key={slug} href={`/shop?category=${slug}`} className="group flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex h-32 w-32 items-center justify-center rounded-full bg-accent-soft ring-0 ring-accent transition-shadow group-hover:ring-2 sm:h-40 sm:w-40"
              >
                <Icon className="text-accent" size={36} />
              </motion.div>
              <p className="mt-4 font-heading text-lg text-ink">{label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
