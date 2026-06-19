import { Hero } from "@/components/Hero";
import { TrustBadges } from "@/components/TrustBadges";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { SpecialOffer } from "@/components/SpecialOffer";
import { Testimonials } from "@/components/Testimonials";
import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholder-products";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryGrid />
      <ProductGrid
        eyebrow="Customer Favourites"
        title="Best Sellers"
        products={PLACEHOLDER_PRODUCTS}
      />
      <SpecialOffer />
      <Testimonials />
    </>
  );
}
