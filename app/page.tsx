import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryGrid } from "@/components/CategoryGrid";
import { WhyShopWithUs } from "@/components/WhyShopWithUs";
import { SpecialOffer } from "@/components/SpecialOffer";
import { AboutUs } from "@/components/AboutUs";
import { Testimonials } from "@/components/Testimonials";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/types";

export default async function Home() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load products from Supabase:", error.message);
  }

  const products: Product[] = error ? [] : data ?? [];
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <>
      <Hero />
      <ProductGrid
        eyebrow="Customer Favourites"
        title="Best Sellers"
        products={featuredProducts}
      />
      <CategoryGrid />
      <WhyShopWithUs />
      <SpecialOffer />
      <AboutUs />
      <Testimonials />
    </>
  );
}
