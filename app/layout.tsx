import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eby Vogue Glamour & Accessories | Footwear, Bags & Accessories in Port Harcourt",
  description:
    "Shop curated footwear, bags & accessories at Eby Vogue Glamour. Authentic styles, fast Port Harcourt delivery, and easy WhatsApp ordering — no online payment required.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <CartDrawer />
          <FloatingWhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
