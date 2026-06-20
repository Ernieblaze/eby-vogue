import type { Product } from "@/lib/types";
import { formatNaira } from "@/lib/format";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348000000000";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductEnquiryLink(product: Product): string {
  const message = [
    `Hi Eby Vogue Glamour, I'd like to order:`,
    `- ${product.name} (${formatNaira(product.price)})`,
    ``,
    `Name:`,
    `Delivery address:`,
  ].join("\n");

  return buildWhatsAppLink(message);
}
