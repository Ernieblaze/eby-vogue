import Link from "next/link";
import { Gem, MessageCircle, ShieldCheck, Truck } from "lucide-react";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

const WHY_SHOP_POINTS = [
  {
    icon: Gem,
    title: "Affordable Luxury",
    description: "Premium-looking footwear, bags, and accessories at prices that make sense.",
  },
  {
    icon: ShieldCheck,
    title: "Hand-Picked Quality",
    description: "Every piece is checked before it reaches you. What you see is what you get.",
  },
  {
    icon: MessageCircle,
    title: "Personal Service",
    description: "Real conversations on WhatsApp, not a faceless checkout.",
  },
  {
    icon: Truck,
    title: "Nationwide Delivery",
    description: "Fast, reliable delivery across Port Harcourt and all over Nigeria.",
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

        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            Eby Vogue Glamour &amp; Accessories is Port Harcourt&apos;s home of
            affordable luxury — a boutique for women who want standout footwear,
            bags, and accessories without the standout price tag.
          </p>
          <p>
            What began as a love for beautiful, well-made pieces has grown into one
            of Port Harcourt&apos;s trusted names for slippers, sandals, heels, and
            handbags. We sell both wholesale and retail, offering styles that look
            and feel premium while staying within reach.
          </p>
          <p>
            Every piece is hand-picked and checked for quality before it reaches you
            — because affordable should never mean a compromise. As a registered
            Nigerian business, we stand behind every order, and when you message us
            on WhatsApp you&apos;re speaking to us directly: we help you choose,
            confirm your size, and arrange payment and delivery personally.
          </p>
        </div>

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
