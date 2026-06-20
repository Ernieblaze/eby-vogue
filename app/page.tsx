import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryGrid } from "@/components/CategoryGrid";
import { WhyShopWithUs } from "@/components/WhyShopWithUs";
import { SpecialOffer } from "@/components/SpecialOffer";
import { AboutUs } from "@/components/AboutUs";
import { Testimonials } from "@/components/Testimonials";
import { PLACEHOLDER_PRODUCTS } from "@/lib/placeholder-products";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductGrid
        eyebrow="Customer Favourites"
        title="Best Sellers"
        products={PLACEHOLDER_PRODUCTS}
      />
      <CategoryGrid />
      <WhyShopWithUs />
      <SpecialOffer />
      <AboutUs />
      <Testimonials />
    </>
  );
}
