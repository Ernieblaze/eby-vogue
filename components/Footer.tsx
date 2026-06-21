import Link from "next/link";
import { Music2, MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";
import { FacebookIcon } from "@/components/icons/FacebookIcon";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const INFO_LINKS = [
  { href: "/faq", label: "FAQ" },
  { href: "/delivery", label: "Delivery Information" },
  { href: "/returns", label: "Returns & Exchanges" },
];

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61558752482136";
const TIKTOK_URL = "https://www.tiktok.com/@ebyvoguefooties";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
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
            Information
          </p>
          <ul className="mt-4 space-y-2">
            {INFO_LINKS.map((link) => (
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
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
              >
                <FacebookIcon size={16} />
                Facebook
              </a>
            </li>
            <li>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
              >
                <Music2 size={16} />
                TikTok
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
