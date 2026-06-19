export type Category = "footwear" | "bags" | "accessories";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: Category;
  sizes: string[] | null;
  image_url: string;
  gallery: string[] | null;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
};
