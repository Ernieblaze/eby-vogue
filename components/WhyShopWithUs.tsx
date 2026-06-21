import { ShieldCheck, Truck, MessageCircle, Lock } from "lucide-react";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "Authentic Products",
    description: "Every piece is checked for quality before it ships.",
  },
  {
    icon: Truck,
    title: "Fast Port Harcourt Delivery",
    description: "Same-day dispatch on orders placed before 2pm.",
  },
  {
    icon: MessageCircle,
    title: "Easy WhatsApp Ordering",
    description: "No accounts, no forms — just chat and order.",
  },
  {
    icon: Lock,
    title: "Secure Shopping",
    description: "Pay on delivery or via transfer, arranged directly with us.",
  },
];

export function WhyShopWithUs() {
  return (
    <section className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">
          The Eby Vogue Promise
        </p>
        <h2 className="mt-2 text-center font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Why Shop With Us
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-line bg-bg p-6 text-center shadow-sm transition-shadow hover:shadow-md sm:text-left"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft sm:mx-0">
                <Icon className="text-accent" size={22} />
              </div>
              <h3 className="mt-4 font-heading text-base text-ink">{title}</h3>
              <p className="mt-1 text-sm text-muted">{description}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Same-day dispatch in Port Harcourt &middot; Nationwide delivery in 2&ndash;4 business days
        </p>
      </div>
    </section>
  );
}
