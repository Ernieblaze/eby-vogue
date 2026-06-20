import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://instagram.com/ebyvogueglamour";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-heading text-xl font-semibold text-ink">Eby Vogue Glamour</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Curated footwear, bags &amp; accessories — styled for you. Step into
            glamour, one piece at a time.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Quick Links
          </p>
          <ul className="mt-4 space-y-2">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Contact
          </p>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={buildGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
              >
                <Camera size={16} />
                @ebyvogueglamour
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line px-4 py-4 sm:px-6">
        <p className="text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} Eby Vogue Glamour &amp; Accessories. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
