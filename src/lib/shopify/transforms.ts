import type {
  ShopifyProduct,
  ShopifyCart,
  Product,
  Cart,
  CartItem,
} from "./types";

/**
 * Transform Shopify product data to UI-friendly format
 */
export function transformProduct(shopifyProduct: ShopifyProduct): Product {
  const price = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
  const compareAtPrice = shopifyProduct.compareAtPriceRange.minVariantPrice.amount
    ? parseFloat(shopifyProduct.compareAtPriceRange.minVariantPrice.amount)
    : null;

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    vendor: shopifyProduct.vendor,
    tags: shopifyProduct.tags,
    price,
    compareAtPrice: compareAtPrice && compareAtPrice > price ? compareAtPrice : null,
    images: shopifyProduct.images.edges.map((edge) => edge.node.url),
    variants: shopifyProduct.variants.edges.map((edge) => ({
      id: edge.node.id,
      title: edge.node.title,
      available: edge.node.availableForSale,
      quantityAvailable: edge.node.quantityAvailable,
      price: parseFloat(edge.node.price.amount),
      compareAtPrice: edge.node.compareAtPrice
        ? parseFloat(edge.node.compareAtPrice.amount)
        : null,
      options: edge.node.selectedOptions,
    })),
    options: shopifyProduct.options.map((option) => ({
      id: option.id,
      name: option.name,
      values: option.values,
    })),
    isNew: shopifyProduct.tags.some(
      (tag) => tag.toLowerCase() === "new" || tag.toLowerCase() === "new-arrival"
    ),
    isSale:
      compareAtPrice !== null &&
      compareAtPrice > price,
  };
}

/**
 * Transform array of Shopify products
 */
export function transformProducts(
  shopifyProducts: { edges: { node: ShopifyProduct }[] }
): Product[] {
  return shopifyProducts.edges.map((edge) => transformProduct(edge.node));
}

/**
 * Transform Shopify cart to UI-friendly format
 */
export function transformCart(shopifyCart: ShopifyCart): Cart {
  const items: CartItem[] = shopifyCart.lines.edges.map((edge) => {
    const line = edge.node;
    const merchandise = line.merchandise;

    return {
      id: line.id,
      variantId: merchandise.id,
      productId: merchandise.product.id,
      handle: merchandise.product.handle,
      title: merchandise.product.title,
      variantTitle: merchandise.title,
      quantity: line.quantity,
      price: parseFloat(merchandise.price.amount),
      compareAtPrice: merchandise.compareAtPrice
        ? parseFloat(merchandise.compareAtPrice.amount)
        : null,
      image: merchandise.product.featuredImage?.url || null,
    };
  });

  return {
    id: shopifyCart.id,
    checkoutUrl: shopifyCart.checkoutUrl,
    totalQuantity: shopifyCart.totalQuantity,
    subtotal: parseFloat(shopifyCart.cost.subtotalAmount.amount),
    total: parseFloat(shopifyCart.cost.totalAmount.amount),
    items,
  };
}
