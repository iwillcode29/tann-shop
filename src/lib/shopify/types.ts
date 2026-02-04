// Shopify Storefront API Types

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image: ShopifyImage | null;
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  tags: string[];
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  images: {
    edges: {
      node: ShopifyImage;
    }[];
  };
  variants: {
    edges: {
      node: ShopifyProductVariant;
    }[];
  };
  options: {
    id: string;
    name: string;
    values: string[];
  }[];
  featuredImage: ShopifyImage | null;
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: ShopifyImage | null;
    };
    price: ShopifyPrice;
    compareAtPrice: ShopifyPrice | null;
  };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyPrice;
    subtotalAmount: ShopifyPrice;
  };
  lines: {
    edges: {
      node: ShopifyCartLine;
    }[];
  };
}

// Transformed types for UI consumption
export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  tags: string[];
  price: number;
  compareAtPrice: number | null;
  images: string[];
  variants: ProductVariant[];
  options: ProductOption[];
  isNew: boolean;
  isSale: boolean;
}

export interface ProductVariant {
  id: string;
  title: string;
  available: boolean;
  quantityAvailable: number | null;
  price: number;
  compareAtPrice: number | null;
  options: { name: string; value: string }[];
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface CartItem {
  id: string;
  variantId: string;
  productId: string;
  handle: string;
  title: string;
  variantTitle: string;
  quantity: number;
  price: number;
  compareAtPrice: number | null;
  image: string | null;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  total: number;
  items: CartItem[];
}
