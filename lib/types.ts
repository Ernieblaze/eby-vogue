export type Category = "footwear" | "bags" | "accessories";

// Mirrors the Supabase `products` table. Fields below are exactly the
// real DB columns; anything UI-only that isn't a column stays optional
// so live rows (which won't have it) don't break consumers.
export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  original_price: number | null;
  category: string;
  sizes: string[] | null;
  image_url: string | null;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  gallery?: string[] | null;
  is_new?: boolean;
};

export type CartItem = {
  id: string;
  product: Product;
  size: string | null;
  quantity: number;
};
