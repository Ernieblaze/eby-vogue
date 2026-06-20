"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatNaira } from "@/lib/format";
import { buildCartEnquiryLink } from "@/lib/whatsapp";

export function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, updateQuantity, removeItem, clearCart } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-ink/50"
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-label="Shopping enquiry cart"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="font-heading text-lg text-ink">Your Enquiry</h2>
              <button
                type="button"
                aria-label="Close cart"
                onClick={closeCart}
                className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-accent"
              >
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <ShoppingBag className="text-muted" size={32} />
                <p className="text-sm text-muted">
                  Your enquiry cart is empty. Add items you&apos;d like to order.
                </p>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-5 py-4">
                  {items.map((item) => {
                    const lineTotal = item.product.price * item.quantity;
                    return (
                      <li
                        key={item.id}
                        className="flex gap-3 border-b border-line py-4 last:border-b-0"
                      >
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-accent-soft">
                          <Image
                            src={item.product.image_url}
                            alt={item.product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col gap-1">
                          <p className="font-heading text-sm text-ink">{item.product.name}</p>
                          {item.size && (
                            <p className="text-xs text-muted">Size: {item.size}</p>
                          )}
                          <p className="text-xs text-muted">{formatNaira(item.product.price)} each</p>

                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full border border-line">
                              <button
                                type="button"
                                aria-label="Decrease quantity"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-accent disabled:opacity-30"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="min-w-6 text-center text-sm text-ink">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label="Increase quantity"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-accent"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <span className="text-sm font-semibold text-accent">
                              {formatNaira(lineTotal)}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          aria-label={`Remove ${item.product.name} from cart`}
                          onClick={() => removeItem(item.id)}
                          className="flex h-9 w-9 flex-shrink-0 items-center justify-center text-muted transition-colors hover:text-accent"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="border-t border-line px-5 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Total</span>
                    <span className="font-heading text-lg text-ink">
                      {formatNaira(subtotal)}
                    </span>
                  </div>

                  <a
                    href={buildCartEnquiryLink(items)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex min-h-11 items-center justify-center rounded-2xl bg-accent px-6 text-sm font-semibold text-surface shadow-lg shadow-accent/25 transition-transform hover:scale-[1.02]"
                  >
                    Order All on WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="mt-2 flex min-h-11 w-full items-center justify-center text-xs font-medium text-muted transition-colors hover:text-accent"
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
