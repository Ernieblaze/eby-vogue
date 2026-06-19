import { Truck, ShieldCheck, MessageCircle, Headset } from "lucide-react";

const BADGES = [
  { icon: Truck, label: "Fast Lagos Delivery" },
  { icon: ShieldCheck, label: "Authentic Products" },
  { icon: MessageCircle, label: "Easy WhatsApp Ordering" },
  { icon: Headset, label: "Style Support" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
        {BADGES.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
            <Icon className="text-accent" size={22} />
            <p className="text-xs font-medium text-ink sm:text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
