"use client";

import { useState, useCallback, memo, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  tags: string[];
  price: number;
  compareAtPrice: number | null;
  images: string[];
  options: { id: string; name: string; values: string[] }[];
  variants: {
    id: string;
    title: string;
    available: boolean;
    quantityAvailable?: number | null;
    price: number;
    compareAtPrice: number | null;
    options: { name: string; value: string }[];
  }[];
  isNew: boolean;
  isSale: boolean;
}

// Mock product data as fallback
const mockProducts: Record<string, Product> = {
  "pace-lite-tank": {
    id: "1",
    handle: "pace-lite-tank",
    title: "Pace Lite Tank",
    vendor: "District Vision",
    description:
      "Engineered for speed and comfort, the Pace Lite Tank features our signature moisture-wicking fabric that keeps you cool during intense sessions. The minimalist design reduces distractions while the athletic cut allows for full range of motion.",
    tags: ["new"],
    price: 95,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=90",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
    ],
    variants: [
      { id: "1-xs-black", title: "XS / Black", available: true, quantityAvailable: 5, price: 95, compareAtPrice: null, options: [{ name: "Size", value: "XS" }, { name: "Color", value: "Black" }] },
      { id: "1-s-black", title: "S / Black", available: true, quantityAvailable: 12, price: 95, compareAtPrice: null, options: [{ name: "Size", value: "S" }, { name: "Color", value: "Black" }] },
      { id: "1-m-black", title: "M / Black", available: true, quantityAvailable: 8, price: 95, compareAtPrice: null, options: [{ name: "Size", value: "M" }, { name: "Color", value: "Black" }] },
      { id: "1-l-black", title: "L / Black", available: true, quantityAvailable: 3, price: 95, compareAtPrice: null, options: [{ name: "Size", value: "L" }, { name: "Color", value: "Black" }] },
      { id: "1-xl-black", title: "XL / Black", available: false, quantityAvailable: 0, price: 95, compareAtPrice: null, options: [{ name: "Size", value: "XL" }, { name: "Color", value: "Black" }] },
    ],
    options: [
      { id: "size", name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { id: "color", name: "Color", values: ["Black", "White", "Navy"] },
    ],
    isNew: true,
    isSale: false,
  },
  "speed-short": {
    id: "2",
    handle: "speed-short",
    title: "Speed Short 5\"",
    vendor: "Bandit Running",
    description:
      "Built for runners who demand performance without compromise. The Speed Short features a 5-inch inseam, built-in brief liner, and multiple pockets for your essentials.",
    tags: [],
    price: 78,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=90",
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=90",
    ],
    variants: [
      { id: "2-s-black", title: "S / Black", available: true, quantityAvailable: 7, price: 78, compareAtPrice: null, options: [{ name: "Size", value: "S" }, { name: "Color", value: "Black" }] },
      { id: "2-m-black", title: "M / Black", available: true, quantityAvailable: 4, price: 78, compareAtPrice: null, options: [{ name: "Size", value: "M" }, { name: "Color", value: "Black" }] },
      { id: "2-l-black", title: "L / Black", available: true, quantityAvailable: 10, price: 78, compareAtPrice: null, options: [{ name: "Size", value: "L" }, { name: "Color", value: "Black" }] },
    ],
    options: [
      { id: "size", name: "Size", values: ["S", "M", "L", "XL"] },
      { id: "color", name: "Color", values: ["Black", "Navy"] },
    ],
    isNew: false,
    isSale: false,
  },
  "ultra-running-tee": {
    id: "3",
    handle: "ultra-running-tee",
    title: "Ultra Running Tee",
    vendor: "Soar",
    description:
      "Designed for the long haul. The Ultra Running Tee combines technical performance with all-day comfort. Features include anti-odor technology, UV protection, and strategic ventilation zones.",
    tags: [],
    price: 110,
    compareAtPrice: 145,
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=90",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=90",
    ],
    variants: [
      { id: "3-m-slate", title: "M / Slate", available: true, quantityAvailable: 2, price: 110, compareAtPrice: 145, options: [{ name: "Size", value: "M" }, { name: "Color", value: "Slate" }] },
      { id: "3-l-slate", title: "L / Slate", available: true, quantityAvailable: 6, price: 110, compareAtPrice: 145, options: [{ name: "Size", value: "L" }, { name: "Color", value: "Slate" }] },
    ],
    options: [
      { id: "size", name: "Size", values: ["S", "M", "L", "XL"] },
      { id: "color", name: "Color", values: ["Slate", "Forest"] },
    ],
    isNew: false,
    isSale: true,
  },
  "long-distance-jacket": {
    id: "4",
    handle: "long-distance-jacket",
    title: "Long Distance Jacket",
    vendor: "Satisfy",
    description:
      "The ultimate running jacket for serious distance athletes. Waterproof, breathable, and packable, it protects you from the elements while maintaining optimal body temperature.",
    tags: ["new"],
    price: 285,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=90",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=90",
    ],
    variants: [
      { id: "4-m-black", title: "M / Black", available: true, quantityAvailable: 3, price: 285, compareAtPrice: null, options: [{ name: "Size", value: "M" }, { name: "Color", value: "Black" }] },
      { id: "4-l-black", title: "L / Black", available: true, quantityAvailable: 5, price: 285, compareAtPrice: null, options: [{ name: "Size", value: "L" }, { name: "Color", value: "Black" }] },
    ],
    options: [
      { id: "size", name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { id: "color", name: "Color", values: ["Black", "Orange"] },
    ],
    isNew: true,
    isSale: false,
  },
  "compression-tight": {
    id: "5",
    handle: "compression-tight",
    title: "Compression Tight",
    vendor: "District Vision",
    description:
      "Graduated compression technology supports your muscles and improves circulation during long runs. The seamless construction and four-way stretch fabric provide a second-skin fit.",
    tags: [],
    price: 145,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=90",
      "https://images.unsplash.com/photo-1618453292459-53424b66bb6a?w=800&q=90",
    ],
    variants: [
      { id: "5-m-black", title: "M / Black", available: true, quantityAvailable: 9, price: 145, compareAtPrice: null, options: [{ name: "Size", value: "M" }, { name: "Color", value: "Black" }] },
      { id: "5-l-black", title: "L / Black", available: true, quantityAvailable: 4, price: 145, compareAtPrice: null, options: [{ name: "Size", value: "L" }, { name: "Color", value: "Black" }] },
    ],
    options: [
      { id: "size", name: "Size", values: ["XS", "S", "M", "L", "XL"] },
      { id: "color", name: "Color", values: ["Black", "Navy"] },
    ],
    isNew: false,
    isSale: false,
  },
  "trail-cap": {
    id: "6",
    handle: "trail-cap",
    title: "Trail Cap",
    vendor: "Ciele",
    description:
      "The go-to cap for trail runners and road warriors alike. Features a moisture-wicking sweatband, laser-cut ventilation, and a reflective brim.",
    tags: ["new"],
    price: 45,
    compareAtPrice: null,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=90",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=90",
    ],
    variants: [
      { id: "6-os-black", title: "One Size / Black", available: true, quantityAvailable: 15, price: 45, compareAtPrice: null, options: [{ name: "Size", value: "One Size" }, { name: "Color", value: "Black" }] },
      { id: "6-os-white", title: "One Size / White", available: true, quantityAvailable: 8, price: 45, compareAtPrice: null, options: [{ name: "Size", value: "One Size" }, { name: "Color", value: "White" }] },
    ],
    options: [
      { id: "size", name: "Size", values: ["One Size"] },
      { id: "color", name: "Color", values: ["Black", "White", "Red"] },
    ],
    isNew: true,
    isSale: false,
  },
};

// Product features (hardcoded since Shopify doesn't have a built-in features field)
const productFeatures: Record<string, string[]> = {
  "pace-lite-tank": [
    "Lightweight moisture-wicking fabric",
    "Athletic fit with full range of motion",
    "Flatlock seams to prevent chafing",
    "Reflective logo for low-light visibility",
  ],
  "speed-short": [
    "5-inch inseam with built-in brief liner",
    "Lightweight ripstop fabric",
    "Side split hem for mobility",
    "Multiple secure pockets",
  ],
  "ultra-running-tee": [
    "Anti-odor silver ion technology",
    "UPF 30+ sun protection",
    "Strategic mesh ventilation zones",
    "Drop-tail hem for coverage",
  ],
  "long-distance-jacket": [
    "Waterproof breathable membrane",
    "Fully taped seams",
    "Adjustable storm hood",
    "Packs into its own pocket",
    "360-degree reflectivity",
  ],
  "compression-tight": [
    "Graduated compression technology",
    "Seamless construction",
    "Four-way stretch fabric",
    "High-rise waistband with pocket",
    "Reflective logos",
  ],
  "trail-cap": [
    "Moisture-wicking sweatband",
    "Laser-cut ventilation holes",
    "Reflective brim underside",
    "Adjustable back closure",
    "Machine washable",
  ],
};

// Default features if not found
const defaultFeatures = [
  "Premium quality materials",
  "Designed for performance",
  "Comfortable fit",
  "Easy care",
];

// Icons
const ChevronLeftIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
  </svg>
));
ChevronLeftIcon.displayName = "ChevronLeftIcon";

const CheckIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
));
CheckIcon.displayName = "CheckIcon";

const MinusIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
));
MinusIcon.displayName = "MinusIcon";

const PlusIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
));
PlusIcon.displayName = "PlusIcon";

// Loading skeleton
const ProductSkeleton = () => (
  <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 animate-pulse">
    <div className="space-y-4">
      <div className="aspect-[3/4] bg-gray-200 rounded-sm" />
      <div className="flex gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-20 h-24 bg-gray-200 rounded-sm" />
        ))}
      </div>
    </div>
    <div className="lg:py-4 space-y-4">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="h-10 w-64 bg-gray-200 rounded" />
      <div className="h-8 w-20 bg-gray-200 rounded" />
      <div className="h-24 w-full bg-gray-200 rounded" />
      <div className="h-12 w-full bg-gray-200 rounded" />
      <div className="h-14 w-full bg-gray-200 rounded" />
    </div>
  </div>
);

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function ProductPage() {
  const params = useParams();
  const handle = params.handle as string;

  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Fetch product from Shopify via API
  useEffect(() => {
    async function fetchProduct() {
      setIsLoading(true);
      setNotFound(false);

      try {
        const res = await fetch(`/api/products/${handle}`);
        const data = await res.json();

        if (data.product) {
          setProduct(data.product);
          // Initialize selected options with first values
          const initialOptions: Record<string, string> = {};
          data.product.options.forEach((option: { name: string; values: string[] }) => {
            initialOptions[option.name] = option.values[0];
          });
          setSelectedOptions(initialOptions);
        } else {
          // Try mock data
          const mockProduct = mockProducts[handle];
          if (mockProduct) {
            setProduct(mockProduct);
            const initialOptions: Record<string, string> = {};
            mockProduct.options.forEach((option) => {
              initialOptions[option.name] = option.values[0];
            });
            setSelectedOptions(initialOptions);
          } else {
            setNotFound(true);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        // Fallback to mock
        const mockProduct = mockProducts[handle];
        if (mockProduct) {
          setProduct(mockProduct);
          const initialOptions: Record<string, string> = {};
          mockProduct.options.forEach((option) => {
            initialOptions[option.name] = option.values[0];
          });
          setSelectedOptions(initialOptions);
        } else {
          setNotFound(true);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (handle) {
      fetchProduct();
    }
  }, [handle]);

  // Find selected variant
  const selectedVariant = product?.variants.find((variant) =>
    variant.options.every(
      (option) => selectedOptions[option.name] === option.value
    )
  );

  const handleAddToCart = useCallback(() => {
    if (!product || !selectedVariant) {
      return;
    }

    setIsAdding(true);

    addToCart(
      {
        id: product.id,
        variantId: selectedVariant.id,
        title: product.title,
        variant: selectedVariant.title,
        price: selectedVariant.price,
        compareAtPrice: selectedVariant.compareAtPrice || undefined,
        image: product.images[0] || "",
        handle: product.handle,
      },
      quantity
    );

    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  }, [product, selectedVariant, quantity, addToCart]);

  const features = product ? (productFeatures[product.handle] || defaultFeatures) : defaultFeatures;

  if (notFound) {
    return (
      <main className="min-h-screen bg-white">
        <Navigation variant="dark" />
        <div className="pt-28 lg:pt-32 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl font-display font-bold text-[#0d0d0d] mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link href="/" className="btn-primary">
              Back to Shop
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navigation variant="dark" />

      <div className="pt-28 lg:pt-32 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-[#0d0d0d] transition-colors"
            >
              <ChevronLeftIcon />
              Back to Shop
            </Link>
          </nav>

          {isLoading ? (
            <ProductSkeleton />
          ) : product ? (
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden">
                  <Image
                    src={product.images[selectedImage] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=90"}
                    alt={product.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Badges */}
                  {(product.isNew || product.isSale) && (
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-[#0d0d0d] text-white text-[10px] font-display font-semibold px-3 py-1.5 uppercase tracking-wider">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-[#e63946] text-white text-[10px] font-display font-semibold px-3 py-1.5 uppercase tracking-wider">
                          Sale
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {product.images.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto hide-scrollbar">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative flex-shrink-0 w-20 h-24 rounded-sm overflow-hidden border-2 transition-colors ${
                          selectedImage === index
                            ? "border-[#0d0d0d]"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.title} view ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="lg:py-4">
                {/* Brand */}
                <p className="text-sm text-gray-500 uppercase tracking-wider font-display mb-2">
                  {product.vendor}
                </p>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-display font-bold text-[#0d0d0d] mb-4">
                  {product.title}
                </h1>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-semibold text-[#0d0d0d]">
                    {formatPrice(selectedVariant?.price || product.price)}
                  </span>
                  {(selectedVariant?.compareAtPrice || product.compareAtPrice) && (
                    <>
                      <span className="text-lg text-gray-400 line-through">
                        {formatPrice(selectedVariant?.compareAtPrice || product.compareAtPrice || 0)}
                      </span>
                      <span className="text-sm font-medium text-[#e63946]">
                        Save {Math.round((1 - (selectedVariant?.price || product.price) / (selectedVariant?.compareAtPrice || product.compareAtPrice || 1)) * 100)}%
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

                {/* Options */}
                {product.options.map((option) => (
                  <div key={option.id} className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-[#0d0d0d]">
                        {option.name}
                        {selectedOptions[option.name] && (
                          <span className="font-normal text-gray-600 ml-2">
                            {selectedOptions[option.name]}
                          </span>
                        )}
                      </p>
                      {option.name === "Size" && (
                        <button className="text-sm text-gray-500 hover:text-[#0d0d0d] underline underline-offset-2">
                          Size Guide
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          onClick={() =>
                            setSelectedOptions((prev) => ({
                              ...prev,
                              [option.name]: value,
                            }))
                          }
                          className={`min-w-[48px] h-12 px-4 border text-sm font-medium transition-all rounded-sm ${
                            selectedOptions[option.name] === value
                              ? "border-[#0d0d0d] bg-[#0d0d0d] text-white"
                              : "border-gray-200 text-[#0d0d0d] hover:border-[#0d0d0d]"
                          }`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-[#0d0d0d] mb-3">Quantity</p>
                  <div className="flex items-center border border-gray-200 rounded-sm w-fit">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <MinusIcon />
                    </button>
                    <span className="w-12 text-center text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(q + 1, selectedVariant?.quantityAvailable || 99))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                      aria-label="Increase quantity"
                      disabled={quantity >= (selectedVariant?.quantityAvailable || 99)}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </div>

                {/* Stock Status */}
                {selectedVariant && (
                  <div className="mb-6">
                    {selectedVariant.quantityAvailable == null ? (
                      <p className="text-sm text-gray-500">Stock info unavailable</p>
                    ) : selectedVariant.quantityAvailable === 0 ? (
                      <p className="text-sm text-red-500 font-medium">Out of stock</p>
                    ) : selectedVariant.quantityAvailable <= 5 ? (
                      <p className="text-sm text-orange-500 font-medium">
                        Only {selectedVariant.quantityAvailable} left in stock - order soon!
                      </p>
                    ) : (
                      <p className="text-sm text-green-600 font-medium">
                        {selectedVariant.quantityAvailable} in stock
                      </p>
                    )}
                  </div>
                )}

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.available || isAdding}
                  className={`w-full btn-primary text-base py-5 ${
                    !selectedVariant?.available ? "opacity-50 cursor-not-allowed" : ""
                  } ${isAdding ? "bg-green-600 border-green-600" : ""}`}
                >
                  {isAdding
                    ? "Added to Cart!"
                    : !selectedVariant?.available
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>

                {/* Features */}
                <div className="mt-10 pt-8 border-t border-gray-100">
                  <h3 className="text-sm font-display font-semibold text-[#0d0d0d] uppercase tracking-wider mb-4">
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#0d0d0d] mt-0.5">
                          <CheckIcon />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shipping Info */}
                <div className="mt-8 p-4 bg-gray-50 rounded-sm">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-[#0d0d0d]">Free shipping</span> on orders over $150
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Usually ships within 1-2 business days
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <Footer />
    </main>
  );
}
