import { shopifyClient, isShopifyConfigured } from "./client";
import {
  GET_PRODUCTS,
  GET_PRODUCT_BY_HANDLE,
  GET_PRODUCTS_BY_COLLECTION,
} from "./queries";
import {
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART_LINE,
  REMOVE_FROM_CART,
  GET_CART,
} from "./mutations";
import {
  transformProduct,
  transformProducts,
  transformCart,
} from "./transforms";
import type { ShopifyProduct, ShopifyCart, Product, Cart } from "./types";

// Re-export types
export * from "./types";
export { isShopifyConfigured };

// ============================================
// PRODUCT OPERATIONS
// ============================================

/**
 * Fetch all products
 */
export async function getProducts(first: number = 20): Promise<Product[]> {
  console.log("getProducts called, isShopifyConfigured:", isShopifyConfigured);

  if (!isShopifyConfigured) {
    console.warn("Shopify not configured, returning empty array");
    return [];
  }

  try {
    console.log("Fetching products from Shopify...");
    const data = await shopifyClient.request<{
      products: { edges: { node: ShopifyProduct }[] };
    }>(GET_PRODUCTS, { first });

    console.log("Shopify returned", data.products.edges.length, "products");
    const transformed = transformProducts(data.products);
    console.log("Transformed products:", transformed.length);
    return transformed;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Fetch a single product by handle
 */
export async function getProductByHandle(
  handle: string
): Promise<Product | null> {
  if (!isShopifyConfigured) {
    console.warn("Shopify not configured, returning null");
    return null;
  }

  try {
    const data = await shopifyClient.request<{
      product: ShopifyProduct | null;
    }>(GET_PRODUCT_BY_HANDLE, { handle });

    if (!data.product) {
      return null;
    }

    return transformProduct(data.product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

/**
 * Fetch products by collection handle
 */
export async function getProductsByCollection(
  collectionHandle: string,
  first: number = 20
): Promise<Product[]> {
  if (!isShopifyConfigured) {
    console.warn("Shopify not configured, returning empty array");
    return [];
  }

  try {
    const data = await shopifyClient.request<{
      collection: { products: { edges: { node: ShopifyProduct }[] } } | null;
    }>(GET_PRODUCTS_BY_COLLECTION, { handle: collectionHandle, first });

    if (!data.collection) {
      return [];
    }

    return transformProducts(data.collection.products);
  } catch (error) {
    console.error("Error fetching collection products:", error);
    return [];
  }
}

// ============================================
// CART OPERATIONS
// ============================================

/**
 * Create a new cart with optional initial items
 */
export async function createCart(
  lines: { merchandiseId: string; quantity: number }[] = []
): Promise<Cart | null> {
  if (!isShopifyConfigured) {
    console.warn("Shopify not configured");
    return null;
  }

  try {
    const data = await shopifyClient.request<{
      cartCreate: {
        cart: ShopifyCart | null;
        userErrors: { field: string[]; message: string }[];
      };
    }>(CREATE_CART, { input: { lines } });

    if (data.cartCreate.userErrors.length > 0) {
      console.error("Cart creation errors:", data.cartCreate.userErrors);
      return null;
    }

    if (!data.cartCreate.cart) {
      return null;
    }

    return transformCart(data.cartCreate.cart);
  } catch (error) {
    console.error("Error creating cart:", error);
    return null;
  }
}

/**
 * Add items to an existing cart
 */
export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart | null> {
  if (!isShopifyConfigured) {
    console.warn("Shopify not configured");
    return null;
  }

  try {
    const data = await shopifyClient.request<{
      cartLinesAdd: {
        cart: ShopifyCart | null;
        userErrors: { field: string[]; message: string }[];
      };
    }>(ADD_TO_CART, { cartId, lines });

    if (data.cartLinesAdd.userErrors.length > 0) {
      console.error("Add to cart errors:", data.cartLinesAdd.userErrors);
      return null;
    }

    if (!data.cartLinesAdd.cart) {
      return null;
    }

    return transformCart(data.cartLinesAdd.cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
}

/**
 * Update cart line quantity
 */
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart | null> {
  if (!isShopifyConfigured) {
    console.warn("Shopify not configured");
    return null;
  }

  try {
    const data = await shopifyClient.request<{
      cartLinesUpdate: {
        cart: ShopifyCart | null;
        userErrors: { field: string[]; message: string }[];
      };
    }>(UPDATE_CART_LINE, {
      cartId,
      lines: [{ id: lineId, quantity }],
    });

    if (data.cartLinesUpdate.userErrors.length > 0) {
      console.error("Update cart errors:", data.cartLinesUpdate.userErrors);
      return null;
    }

    if (!data.cartLinesUpdate.cart) {
      return null;
    }

    return transformCart(data.cartLinesUpdate.cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    return null;
  }
}

/**
 * Remove items from cart
 */
export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart | null> {
  if (!isShopifyConfigured) {
    console.warn("Shopify not configured");
    return null;
  }

  try {
    const data = await shopifyClient.request<{
      cartLinesRemove: {
        cart: ShopifyCart | null;
        userErrors: { field: string[]; message: string }[];
      };
    }>(REMOVE_FROM_CART, { cartId, lineIds });

    if (data.cartLinesRemove.userErrors.length > 0) {
      console.error("Remove from cart errors:", data.cartLinesRemove.userErrors);
      return null;
    }

    if (!data.cartLinesRemove.cart) {
      return null;
    }

    return transformCart(data.cartLinesRemove.cart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    return null;
  }
}

/**
 * Get cart by ID
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  if (!isShopifyConfigured) {
    console.warn("Shopify not configured");
    return null;
  }

  try {
    const data = await shopifyClient.request<{
      cart: ShopifyCart | null;
    }>(GET_CART, { cartId });

    if (!data.cart) {
      return null;
    }

    return transformCart(data.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}
