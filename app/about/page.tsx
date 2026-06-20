import Link from "next/link";
import { Gem, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

const WHY_SHOP_POINTS = [
  {
    icon: Gem,
    title: "Curated Selection",
    description: "Every piece is hand-picked for quality and timeless style.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic Products",
    description: "What you see is what you get — no surprises, ever.",
  },
  {
    icon: MessageCircle,
    title: "Personal Service",
    description: "Real conversations on WhatsApp, not a faceless checkout.",
  },
  {
    icon: Truck,
    title: "Lagos Delivery",
    description: "Fast, reliable delivery across Lagos and beyond.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">
          Our Story
        </p>
        <h1 className="mt-2 text-center font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          About Eby Vogue Glamour
        </h1>

        {/* TODO: replace with client's real brand story */}
        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Eby Vogue Glamour &amp; Accessories is a Lagos-based boutique built on a
            simple idea: glamour should feel personal. We curate footwear, bags, and
            accessories for women who want to step out with confidence, without
            wading through endless options or guessing at quality.
          </p>
          <p>
            Every piece in our collection is chosen by hand, checked for quality, and
            styled with you in mind. There&apos;s no faceless checkout here — when you
            reach out, you&apos;re talking to a real person who wants to help you find
            exactly what you&apos;re looking for, then get it to your door.
          </p>
          <p>
            From our first sale to today, our promise has stayed the same: authentic
            products, honest prices, and service that feels like a friend helping you
            shop, not a transaction.
          </p>
        </div>

        {/* TODO: replace with client's real "why shop with us" copy if different */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {WHY_SHOP_POINTS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-line bg-surface p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft">
                <Icon className="text-accent" size={22} />
              </div>
              <h2 className="mt-4 font-heading text-base text-ink">{title}</h2>
              <p className="mt-1 text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-2xl font-semibold text-ink">
            Ready to find your next favourite piece?
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/shop"
              className="flex min-h-11 items-center justify-center rounded-2xl bg-accent px-6 text-sm font-semibold text-surface shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02]"
            >
              Browse the Collection
            </Link>
            <a
              href={buildGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center rounded-2xl border border-line bg-surface px-6 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-accent hover:text-accent"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
