import type { CartItem, Product } from "@/lib/types";
import { formatNaira } from "@/lib/format";

// Fallback used only if NEXT_PUBLIC_WHATSAPP_NUMBER is not set in .env.local.
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2349078311175";

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductEnquiryLink(product: Product): string {
  const message = [
    `Hello Eby Vogue Glamour! I'm interested in ordering:`,
    ``,
    `Product: ${product.name}`,
    `Product ID: ${product.id}`,
    `Price: ${formatNaira(product.price)}`,
    ``,
    `Please confirm availability and delivery details.`,
  ].join("\n");

  return buildWhatsAppLink(message);
}

export function buildCartEnquiryLink(items: CartItem[]): string {
  const lines = items.map((item, index) => {
    const lineTotal = item.product.price * item.quantity;
    const sizePart = item.size ? ` - Size: ${item.size}` : "";
    return `${index + 1}. ${item.product.name} (ID: ${item.product.id})${sizePart} - Qty: ${item.quantity} - ${formatNaira(lineTotal)}`;
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const message = [
    `Hello Eby Vogue Glamour! I'm interested in ordering:`,
    ``,
    ...lines,
    ``,
    `Total: ${formatNaira(total)}`,
    ``,
    `Name:`,
    `Delivery address:`,
  ].join("\n");

  return buildWhatsAppLink(message);
}

export function buildGeneralWhatsAppLink(): string {
  return buildWhatsAppLink(
    "Hello Eby Vogue Glamour! I'd love to see your latest footwear, bags & accessories."
  );
}
