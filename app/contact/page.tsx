import { Clock, Globe, Camera, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

// TODO: replace with client's real WhatsApp number if this env var changes.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348000000000";
const WHATSAPP_DISPLAY = `+${WHATSAPP_NUMBER}`;

// TODO: replace with client's real Instagram handle/URL.
const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/ebyvogueglamour";

export default function ContactPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">
          We&apos;d Love to Hear From You
        </p>
        <h1 className="mt-2 text-center font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Get in Touch
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted sm:text-base">
          Questions about a piece, an order, or delivery? Reach out — we typically
          reply within the hour during business hours.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 text-sm font-semibold text-surface shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02] sm:w-auto"
          >
            <MessageCircle size={18} />
            Chat with us on WhatsApp
          </a>
        </div>

        {/* TODO: replace with client's real contact details */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <Phone className="mt-0.5 text-accent" size={20} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Phone / WhatsApp
              </p>
              <p className="mt-1 text-sm text-ink">{WHATSAPP_DISPLAY}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <Mail className="mt-0.5 text-accent" size={20} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Email</p>
              <p className="mt-1 text-sm text-ink">hello@ebyvogueglamour.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <MapPin className="mt-0.5 text-accent" size={20} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Area Served
              </p>
              <p className="mt-1 text-sm text-ink">Lagos, Nigeria</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <Clock className="mt-0.5 text-accent" size={20} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Business Hours
              </p>
              <p className="mt-1 text-sm text-ink">Mon&ndash;Sat, 9am&ndash;6pm</p>
            </div>
          </div>
        </div>

        {/* TODO: replace with client's real social links */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Follow Us
          </p>
          <div className="flex gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram (placeholder link — update with real handle)"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Camera size={18} />
            </a>
            <a
              href="#"
              aria-label="Facebook (placeholder link — update with real page)"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
