import { Clock, MapPin, MessageCircle, Truck } from "lucide-react";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

const DELIVERY_POINTS = [
  {
    icon: Clock,
    title: "Same-Day Dispatch in Port Harcourt",
    description: "Orders placed before 2pm are dispatched the same day.",
  },
  {
    icon: Truck,
    title: "Free Port Harcourt Delivery",
    description: "Free delivery within Port Harcourt on orders over ₦50,000.",
  },
  {
    icon: MapPin,
    title: "Nationwide Delivery",
    description: "Delivery outside Port Harcourt takes 2–4 business days.",
  },
  {
    icon: MessageCircle,
    title: "Arranged Over WhatsApp",
    description: "Once your order is confirmed, we'll agree delivery timing and details with you directly on WhatsApp.",
  },
];

export default function DeliveryPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">
          Getting Your Order to You
        </p>
        <h1 className="mt-2 text-center font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Delivery Information
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted sm:text-base">
          A quick overview of how and when your order will reach you.
        </p>

        {/* TODO: replace with client's real delivery details if different */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {DELIVERY_POINTS.map(({ icon: Icon, title, description }) => (
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

        <div className="mt-10 rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <h2 className="font-heading text-base text-ink">Delivery Fees Outside Port Harcourt</h2>
          {/* TODO: confirm with client */}
          <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
            Delivery fees outside Port Harcourt vary by location and courier rates. We&apos;ll
            confirm the exact fee with you on WhatsApp before your order is dispatched,
            so there are no surprises.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-2xl font-semibold text-ink">
            Questions about your delivery?
          </h2>
          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center rounded-2xl bg-accent px-6 text-sm font-semibold text-surface shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02]"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
