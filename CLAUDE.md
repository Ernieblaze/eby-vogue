@AGENTS.md
# CLAUDE.md — Eby Vogue Glamour & Accessories

> This file is read by Claude Code at the start of every session. It defines what
> we're building, how it should look, and the rules to follow. Keep it accurate —
> if a decision changes, update this file.

---

## 1. What we're building

An elegant online fashion boutique for **Eby Vogue Glamour & Accessories**, selling
**footwear, bags, and accessories**.

**There is NO online payment.** Checkout works like this:

1. Customer browses and taps "Add to enquiry" on items they want (builds a cart).
2. Customer taps "Order on WhatsApp".
3. The site opens WhatsApp with a pre-filled message listing every item, size,
   quantity, and the total in Naira.
4. The owner receives the order on her WhatsApp and arranges payment + delivery directly.

The **owner is non-technical**. She manages products through a simple admin panel
(`/admin`) backed by Supabase — adding products, changing prices, uploading photos,
and marking items out of stock, all from her phone. Code/Git is never required of her.

---

## 2. Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- **Framer Motion** for animation
- **lucide-react** for icons
- **Supabase** for the products database, image storage, and admin login
- Hosted on **Vercel**, source on **GitHub**

Install deps with:
```bash
npm install framer-motion lucide-react @supabase/supabase-js
```

---

## 3. Commands

```bash
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build (run before assuming things work)
npm run lint     # lint check
git push         # deploys to Vercel automatically
```

---

## 4. Design system — "Champagne & Noir"

Editorial, glamorous, premium. Think Vogue boutique, not generic shop.

### Colours (define as CSS variables in globals.css + Tailwind theme — never hardcode hex in components)
| Token | Value | Use |
|---|---|---|
| `--bg` | `#FAF7F2` | warm cream page background |
| `--surface` | `#FFFFFF` | cards |
| `--ink` | `#1A1A1A` | headings & main text |
| `--muted` | `#6B6B6B` | secondary text |
| `--accent` | `#B08D57` | champagne gold — buttons, prices, highlights |
| `--accent-soft` | `#EBD9C0` | category circles, tags, hover rings |
| `--blush` | `#E8D5D0` | soft secondary accent |
| `--line` | `#E6E0D6` | thin dividers / borders |

### Typography (load via `next/font`)
- **Headings:** Playfair Display (serif) — this is what makes it look like fashion.
- **Body / UI:** Inter (sans).
- Small uppercase labels with letter-spacing for eyebrow text (e.g. "NEW ARRIVALS").

### Visual rules
- Generous white space. Large radii (`rounded-2xl`). Soft, low shadows.
- Product images sit on clean / cream backgrounds.
- Thin gold dividers. Mobile-first and fully responsive (most shoppers are on small Android screens).

### Animation rules (Framer Motion)
- Fast and tasteful: 200–400ms, eased, never blocks interaction.
- Hero text: staggered fade + slide up on load.
- Sections: fade + ~20px rise on scroll into view.
- Product grids: staggered card reveal.
- Product cards: lift on hover + subtle image zoom.
- Category circles: scale + gold ring on hover.
- Cart drawer: slide in from right.
- Page transitions: fade.

---

## 5. Currency & formatting

- All prices in **Nigerian Naira (₦)** with thousands separators, no decimals
  unless needed. Example: `₦18,000`.
- Create one helper `formatNaira(n: number)` and use it everywhere — never format inline.

---

## 6. Categories

Fixed set, lowercase in the database:
- `footwear`
- `bags`
- `accessories`

Footwear products use the `sizes` field; bags / accessories usually don't.

---

## 7. Data model (Supabase `products` table)

```
id             uuid (pk)
name           text
description    text
price          numeric
original_price numeric | null   -- show strike-through when present
category       'footwear' | 'bags' | 'accessories'
sizes          text[]           -- e.g. ['38','39','40'], mainly footwear
image_url      text             -- main image (Supabase Storage URL)
gallery        text[]           -- extra images (optional)
in_stock       boolean
featured       boolean          -- shows in home "Best Sellers"
created_at     timestamptz
```

- Public can READ products. Only the authenticated admin can write.
- Product images live in a public Supabase Storage bucket named `product-images`.
- There is exactly ONE admin user (created manually in Supabase Auth). No public sign-up.

Keep the shared `Product` TypeScript type in `lib/types.ts` and import it everywhere.

---

## 8. WhatsApp checkout

- Owner's number lives in `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, with country
  code, no `+`, e.g. `2348012345678`).
- `lib/whatsapp.ts` builds: `https://wa.me/<number>?text=<URL-encoded message>`.
- Message lists each item (name, size if any, qty, line price), the total, and
  blank "Name:" / "Delivery address:" lines for the customer to fill.
- The "Order on WhatsApp" button opens this link in a new tab.

---

## 9. Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_INSTAGRAM_URL=
```
Set these in `.env.local` (never committed) AND in Vercel project settings.

---

## 10. Project structure

```
app/
  layout.tsx            fonts, navbar, footer, cart provider, page transitions
  page.tsx              home
  globals.css
  shop/page.tsx         all products + category filter + search
  product/[id]/page.tsx single product
  about/page.tsx
  contact/page.tsx
  admin/
    login/page.tsx      Supabase email/password login
    page.tsx            protected dashboard (CRUD products)
components/
  Navbar, Footer, Hero, TrustBadges, CategoryGrid, ProductCard,
  ProductGrid, CartDrawer, SpecialOffer, Testimonials
  admin/ ProductForm, ProductTable
lib/
  supabase.ts           supabase client
  cart-context.tsx      cart state + add/remove/clear
  whatsapp.ts           builds the wa.me link
  format.ts             formatNaira helper
  types.ts              Product type
public/                 logo, placeholder images
```

---

## 11. Coding conventions

- TypeScript everywhere. Prefer **named exports**.
- Functional components + hooks. No class components.
- All colours / spacing via Tailwind theme tokens — **never** raw hex or magic
  numbers in JSX.
- Components are mobile-first and responsive by default.
- Keep components small and focused; extract repeated UI into shared components.
- Use Server Components for data fetching where sensible; Client Components only
  where interaction / state / animation is needed (`"use client"`).
- Optimise images (Next `<Image>`, compressed uploads) — shoppers are on mobile data.
- Accessible: real buttons / links, alt text on images, visible focus states.

---

## 12. Build order (don't skip ahead)

1. Design system + layout (navbar, footer, fonts, colours, page transitions).
2. Home page with **dummy data** first.
3. Cart + WhatsApp checkout.
4. Wire in Supabase (replace dummy data).
5. Admin panel (login + CRUD).
6. Shop, product, about, contact pages.
7. Animation pass + mobile testing.
8. Domain + launch.

Run `npm run build` and `git push` (deploy) at the end of each step so problems stay small.

---

## 13. Important gotchas

- Never commit `.env.local` or any keys.
- Don't add a payment gateway — checkout is WhatsApp only.
- Don't allow public admin sign-up — one owner account only.
- Out-of-stock items: badge or hide them, never let them be added to the cart.
- Test the WhatsApp link on a real phone, not just desktop.
- Format every price with `formatNaira` — no stray inline formatting.

---

## 14. Brand copy tone

Warm, confident, a little aspirational. Short, elegant lines. Examples:
- Hero: "Step Into Glamour."
- Subtext: "Curated footwear, bags & accessories — styled for you."
- CTA: "Shop Now" / "New Arrivals".
Avoid clichés and exclamation overload.