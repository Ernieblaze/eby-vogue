import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function ReturnsPage() {
  return (
    <div className="bg-bg">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-accent">
          Our Promise to You
        </p>
        <h1 className="mt-2 text-center font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Returns &amp; Exchanges
        </h1>
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted sm:text-base">
          We want you to love what you order. If something isn&apos;t quite right,
          here&apos;s how we can help.
        </p>

        {/* TODO: replace with client's real return/exchange policy if different */}
        <div className="mt-10 flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-heading text-base text-ink sm:text-lg">Return Window</h2>
            {/* TODO: confirm with client */}
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Items can be returned or exchanged within 3 days of delivery, as long as
              they're unworn, unused, and in their original packaging with tags
              attached.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-heading text-base text-ink sm:text-lg">How to Start a Return</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Message us on WhatsApp with your order details and a photo of the item.
              We'll confirm whether it qualifies and guide you through the next steps —
              no forms, just a conversation.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-heading text-base text-ink sm:text-lg">Exchanges</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Prefer a different size or colour? We're happy to exchange your item,
              subject to availability. Let us know on WhatsApp and we'll sort it out.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-heading text-base text-ink sm:text-lg">Restocking &amp; Fees</h2>
            {/* TODO: confirm with client */}
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              We don&apos;t currently charge a restocking fee on qualifying returns.
              Delivery fees for return pickups, if any, will be agreed with you on
              WhatsApp beforehand.
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
            <h2 className="font-heading text-base text-ink sm:text-lg">Non-Returnable Items</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
              Items marked as final sale or clearance, and any product showing signs of
              wear, cannot be returned or exchanged.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-2xl font-semibold text-ink">
            Need help with an order?
          </h2>
          <a
            href={buildGeneralWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center justify-center rounded-2xl bg-accent px-6 text-sm font-semibold text-surface shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02]"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
