import { Clock, Music2, MapPin, MessageCircle, Phone } from "lucide-react";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { FacebookIcon } from "@/components/icons/FacebookIcon";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61558752482136";
const TIKTOK_URL = "https://www.tiktok.com/@ebyvoguefooties";

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
          Questions about a piece, your size, an order, or delivery? Message us on
          WhatsApp — it&apos;s the fastest way to reach us, and we usually reply
          within the hour during business hours.
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

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <Phone className="mt-0.5 text-accent" size={20} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Phone / WhatsApp
              </p>
              <p className="mt-1 text-sm text-ink">+234 907 831 1175</p>
            </div>
          </div>

          {/* TODO: add email if client wants one later */}

          <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <MapPin className="mt-0.5 text-accent" size={20} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Location
              </p>
              <p className="mt-1 text-sm text-ink">
                Port Harcourt, Rivers State &middot; Nationwide delivery
              </p>
              {/* TODO: confirm if client wants street address shown: 113 Rumuola Street, Port Harcourt */}
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 shadow-sm">
            <Clock className="mt-0.5 text-accent" size={20} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Business Hours
              </p>
              <p className="mt-1 text-sm text-ink">Open daily &middot; Monday&ndash;Sunday</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Follow Us
          </p>
          <div className="flex gap-3">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
            >
              <Music2 size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
