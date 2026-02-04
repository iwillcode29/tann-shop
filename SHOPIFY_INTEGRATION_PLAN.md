# Shopify + Next.js Integration Plan for TANN Shop

## Overview
Integrate Shopify Storefront API with the existing Next.js 16 landing page to enable real e-commerce functionality: product fetching, cart management, and Shopify checkout.

---

## Prerequisites (User Action - Can Do In Parallel)

> **Note:** Code will include fallback to mock data, so site works during development. Configure Shopify when ready.

### Shopify Store Setup
1. Create a Shopify store at shopify.com
2. Add products with: title, price, vendor (brand), images (2+ per product)
3. Tag products with "new" for new arrivals badge

### Create Storefront API Access
1. Go to **Settings > Apps and sales channels > Develop apps**
2. Click **Create an app** (name: "TANN Storefront")
3. **Configure Storefront API scopes**:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
4. Install app and copy the **Storefront API access token**

---

## Implementation Steps

### Phase 1: Foundation

**1. Environment Setup**
- Create `.env.local`:
  ```
  NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
  NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
  ```

**2. Install Dependencies**
```bash
npm install graphql graphql-request
```

**3. Create Shopify Client** (`src/lib/shopify/`)
- `client.ts` - GraphQL client configuration
- `types.ts` - TypeScript interfaces
- `queries.ts` - Product queries
- `mutations.ts` - Cart mutations
- `transforms.ts` - Shopify → UI data transformation
- `index.ts` - Re-exports

### Phase 2: Cart System

**4. Cart Context** (`src/contexts/CartContext.tsx`)
- Cart state with localStorage persistence
- Functions: addToCart, updateQuantity, removeFromCart
- Cart open/close state

**5. Cart Drawer** (`src/components/CartDrawer.tsx`)
- Slide-in drawer from right
- Cart items with quantity controls
- Subtotal and checkout button
- Redirects to Shopify checkout

**6. Update Layout** (`src/app/layout.tsx`)
- Wrap app with `CartProvider`
- Add `CartDrawer` component

### Phase 3: Connect Components

**7. Update Navigation** (`src/components/Navigation.tsx`)
- Connect cart icon to `useCart()` hook
- Show real cart count instead of hardcoded "2"
- Open cart drawer on click

**8. Update next.config.ts**
- Add `cdn.shopify.com` to image remote patterns

### Phase 4: Products

**9. Update ProductCarousel** (`src/components/ProductCarousel.tsx`)
- Fetch products from Shopify Storefront API
- Transform data to match existing UI interface
- Connect "Quick Add" to cart

**10. Dynamic Product Pages** (`src/app/products/[handle]/page.tsx`)
- Create dynamic route fetching from Shopify
- Product details with add-to-cart
- Delete old static product pages

---

## File Changes Summary

### New Files
```
src/lib/shopify/
  ├── client.ts
  ├── types.ts
  ├── queries.ts
  ├── mutations.ts
  ├── transforms.ts
  └── index.ts
src/contexts/CartContext.tsx
src/components/CartDrawer.tsx
src/app/products/[handle]/page.tsx
.env.local
```

### Modified Files
```
src/app/layout.tsx              # Add CartProvider + CartDrawer
src/components/Navigation.tsx   # Connect cart to context
src/components/ProductCarousel.tsx  # Fetch from Shopify
next.config.ts                  # Add Shopify CDN domain
```

### Deleted Files
```
src/app/products/pace-lite-tank/page.tsx
src/app/products/speed-short/page.tsx
src/app/products/ultra-running-tee/page.tsx
src/app/products/long-distance-jacket/page.tsx
src/app/products/compression-tight/page.tsx
src/app/products/trail-cap/page.tsx
```

---

## Checkout Flow
1. User clicks "Checkout" in cart drawer
2. Redirect to `cart.checkoutUrl` (Shopify hosted checkout)
3. Shopify handles payment, shipping, taxes
4. User returns to site after purchase

---

## Verification
1. Run `npm run dev` and verify products load from Shopify
2. Click "Quick Add" - cart drawer opens with item
3. Adjust quantities, remove items
4. Click "Checkout" - redirects to Shopify checkout
5. Complete test purchase with Shopify test mode

---

## To Resume Implementation

Run:
```bash
npm install graphql graphql-request
```

Then continue with the task list in Claude Code.
