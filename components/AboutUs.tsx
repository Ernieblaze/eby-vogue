import Image from "next/image";
import { unsplashUrl } from "@/lib/unsplash";

const ABOUT_IMAGE = unsplashUrl("1490481651871-ab68de25d43d", 700);

export function AboutUs() {
  return (
    <section className="bg-bg">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-2">
        <div className="relative h-64 overflow-hidden rounded-2xl shadow-md sm:h-80">
          <Image
            src={ABOUT_IMAGE}
            alt="Curated rack of Eby Vogue Glamour styles"
            fill
            loading="lazy"
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            About Us
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Glamour, Curated With Care
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted md:mx-0 md:text-base">
            Eby Vogue Glamour &amp; Accessories is a Lagos-based boutique
            bringing you hand-picked footwear, bags, and accessories. Every
            piece is chosen for quality and style, and every order is handled
            personally — no middlemen, no guesswork, just glamour styled for
            you.
          </p>
        </div>
      </div>
    </section>
  );
}
