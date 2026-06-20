import { MessageCircle } from "lucide-react";
import { buildGeneralWhatsAppLink } from "@/lib/whatsapp";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={buildGeneralWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-surface shadow-lg shadow-ink/20 transition-transform hover:scale-105"
    >
      <MessageCircle size={26} />
    </a>
  );
}
