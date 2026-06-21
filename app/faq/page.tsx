import Link from "next/link";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

// TODO: replace with client's real FAQ copy if any answers change.
const FAQS = [
  {
    question: "How does ordering work?",
    answer:
      "Browse the Shop and tap \"Add to Enquiry\" on anything you like — this builds a simple enquiry cart, no account needed. When you're ready, tap \"Order on WhatsApp\" and we'll open a pre-filled WhatsApp message listing your items so you can send it straight to us.",
  },
  {
    question: "How do I pay?",
    answer:
      "There's no online payment on this site. Once you message us on WhatsApp, we'll confirm availability and arrange payment directly with you — either pay on delivery or by bank transfer.",
  },
  {
    question: "How does delivery work?",
    answer:
      "We dispatch same-day in Port Harcourt for orders placed before 2pm, and deliver nationwide in 2–4 business days. Delivery details and timing are always confirmed with you over WhatsApp. See our Delivery page for more.",
  },
  {
    question: "What if I'm unsure about sizing, or need to return something?",
    answer:
      "Feel free to ask us on WhatsApp before you order if you're unsure about sizing — we're happy to help you pick the right fit. If something isn't quite right after delivery, see our Returns & Exchanges page for how that works.",
  },
  {
    question: "Can I ask about a specific product first?",
    answer:
      "Of course. Tap \"Order on WhatsApp\" on any product page to message us about that exact item, or just reach out directly and mention the product name — we'll get back to you quickly.",
  },
];

export default function FaqPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">
          Need to Know
        </p>
        <h1 className="mt-2 text-center font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Frequently Asked Questions
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted sm:text-base">
          Everything you need to know about shopping with us. Can&apos;t find your
          answer? Just message us on WhatsApp.
        </p>

        <div className="mt-10 flex flex-col gap-4">
          {FAQS.map(({ question, answer }) => (
            <div
              key={question}
              className="rounded-2xl border border-line bg-surface p-6 shadow-sm"
            >
              <h2 className="font-heading text-base text-ink sm:text-lg">{question}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-2xl font-semibold text-ink">
            Still have a question?
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={buildGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center rounded-2xl bg-accent px-6 text-sm font-semibold text-surface shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02]"
            >
              Ask on WhatsApp
            </a>
            <Link
              href="/shop"
              className="flex min-h-11 items-center justify-center rounded-2xl border border-line bg-surface px-6 text-sm font-semibold text-ink shadow-sm transition-colors hover:border-accent hover:text-accent"
            >
              Browse the Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
