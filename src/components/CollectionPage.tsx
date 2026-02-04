"use client";

import { useState, useEffect, useMemo, useCallback, memo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

interface Product {
  id: string;
  handle: string;
  title: string;
  vendor: string;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  variants: { id: string; title: string; available: boolean; price: number }[];
  isNew: boolean;
  isSale: boolean;
}

interface Subcategory {
  label: string;
  href: string;
}

interface CollectionPageProps {
  title: string;
  description: string;
  collectionHandle: string;
  breadcrumbs: { label: string; href: string }[];
  subcategories?: Subcategory[];
  accentColor?: string;
  heroImage?: string;
}

type SortOption = "featured" | "newest" | "price-asc" | "price-desc";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

// ─────────────────────────────────────────────
// Utility
// ─────────────────────────────────────────────

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// ─────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────

const ArrowIcon = memo(({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
));
ArrowIcon.displayName = "ArrowIcon";

const GridIcon = memo(({ filled }: { filled?: boolean }) => (
  <svg className="w-[18px] h-[18px]" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
  </svg>
));
GridIcon.displayName = "GridIcon";

const LargeGridIcon = memo(({ filled }: { filled?: boolean }) => (
  <svg className="w-[18px] h-[18px]" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h6v6H4V4zM14 4h6v6h-6V4zM4 14h6v6H4v-6zM14 14h6v6h-6v-6z" />
  </svg>
));
LargeGridIcon.displayName = "LargeGridIcon";

const FilterIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
));
FilterIcon.displayName = "FilterIcon";

const CloseIcon = memo(({ size = "md" }: { size?: "sm" | "md" }) => (
  <svg className={size === "sm" ? "w-3.5 h-3.5" : "w-5 h-5"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={size === "sm" ? 2.5 : 1.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
CloseIcon.displayName = "CloseIcon";

const ChevronIcon = memo(({ direction = "down", className }: { direction?: "up" | "down"; className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={direction === "up" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
  </svg>
));
ChevronIcon.displayName = "ChevronIcon";

const CheckIcon = memo(() => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  </svg>
));
CheckIcon.displayName = "CheckIcon";

const BagPlusIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v4M10 16h4" />
  </svg>
));
BagPlusIcon.displayName = "BagPlusIcon";

// ─────────────────────────────────────────────
// Product Card
// ─────────────────────────────────────────────

const ProductCard = memo(({
  product,
  onQuickAdd,
  index,
}: {
  product: Product;
  onQuickAdd: (product: Product) => void;
  index: number;
}) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    onQuickAdd(product);
    setTimeout(() => setIsAdding(false), 800);
  };

  return (
    <div
      className="group animate-fadeInUp"
      style={{ animationDelay: `${Math.min(index * 0.04, 0.3)}s`, animationFillMode: "both" }}
    >
      <Link href={`/products/${product.handle}`} className="block">
        <div className="relative bg-[#f2f2f0] overflow-hidden aspect-[3/4]">
          {/* Primary Image */}
          <Image
            src={product.images[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"}
            alt={product.title}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Secondary Image on Hover */}
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-[#0d0d0d] text-white text-[9px] font-display font-semibold px-2.5 py-1 uppercase tracking-[0.15em]">
                New
              </span>
            )}
            {product.isSale && product.compareAtPrice && (
              <span className="bg-[#c1272d] text-white text-[9px] font-display font-semibold px-2.5 py-1 uppercase tracking-[0.15em]">
                {Math.round((1 - product.price / product.compareAtPrice) * 100)}% Off
              </span>
            )}
          </div>

          {/* Quick Add — slides up on hover */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className="w-full bg-[#0d0d0d]/90 backdrop-blur-sm text-white py-3.5 flex items-center justify-center gap-2 text-[11px] font-display font-semibold uppercase tracking-[0.15em] hover:bg-[#0d0d0d] transition-colors disabled:opacity-70"
            >
              {isAdding ? (
                <span className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" strokeLinecap="round" />
                  </svg>
                  Added
                </span>
              ) : (
                <>
                  <BagPlusIcon />
                  Quick Add
                </>
              )}
            </button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-3.5 space-y-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-display">
          {product.vendor}
        </p>
        <Link href={`/products/${product.handle}`}>
          <h3 className="text-[13px] font-medium text-[#0d0d0d] leading-snug group-hover:underline underline-offset-2 decoration-gray-300">
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 pt-0.5">
          <span className="text-[13px] font-semibold text-[#0d0d0d]">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-[12px] text-gray-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});
ProductCard.displayName = "ProductCard";

// ─────────────────────────────────────────────
// Loading Skeleton
// ─────────────────────────────────────────────

const ProductSkeleton = memo(({ index }: { index: number }) => (
  <div
    className="animate-fadeIn"
    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: "both" }}
  >
    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
    <div className="mt-3.5 space-y-2">
      <div className="h-2.5 w-14 bg-gray-200 rounded-full" />
      <div className="h-3.5 w-28 bg-gray-200 rounded-full" />
      <div className="h-3.5 w-16 bg-gray-200 rounded-full" />
    </div>
  </div>
));
ProductSkeleton.displayName = "ProductSkeleton";

// ─────────────────────────────────────────────
// Filter Sidebar
// ─────────────────────────────────────────────

const FilterPanel = memo(({
  brands,
  selectedBrands,
  onToggleBrand,
  priceRange,
  maxPrice,
  onPriceChange,
  showOnSale,
  onToggleSale,
  showNewOnly,
  onToggleNew,
  activeCount,
  onClearAll,
}: {
  brands: string[];
  selectedBrands: string[];
  onToggleBrand: (brand: string) => void;
  priceRange: [number, number];
  maxPrice: number;
  onPriceChange: (range: [number, number]) => void;
  showOnSale: boolean;
  onToggleSale: () => void;
  showNewOnly: boolean;
  onToggleNew: () => void;
  activeCount: number;
  onClearAll: () => void;
}) => {
  const [openSections, setOpenSections] = useState({ brand: true, price: false, tags: false });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-0">
      {/* Brand Filter */}
      {brands.length > 0 && (
        <div className="border-b border-gray-150">
          <button
            onClick={() => toggleSection("brand")}
            className="flex items-center justify-between w-full py-4 text-left group"
          >
            <span className="text-[11px] font-display font-semibold text-[#0d0d0d] uppercase tracking-[0.15em]">
              Brand
              {selectedBrands.length > 0 && (
                <span className="ml-1.5 text-gray-400 font-normal">({selectedBrands.length})</span>
              )}
            </span>
            <ChevronIcon
              direction={openSections.brand ? "up" : "down"}
              className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors"
            />
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-out ${openSections.brand ? "max-h-64 pb-4" : "max-h-0"}`}>
            <div className="space-y-1">
              {brands.map((brand) => {
                const isSelected = selectedBrands.includes(brand);
                return (
                  <button
                    key={brand}
                    onClick={() => onToggleBrand(brand)}
                    className="flex items-center gap-3 w-full py-1.5 group/item"
                  >
                    <div className={`w-4 h-4 border flex items-center justify-center transition-all duration-150 ${
                      isSelected
                        ? "bg-[#0d0d0d] border-[#0d0d0d]"
                        : "border-gray-300 group-hover/item:border-gray-500"
                    }`}>
                      {isSelected && <CheckIcon />}
                    </div>
                    <span className={`text-[13px] transition-colors ${
                      isSelected ? "text-[#0d0d0d] font-medium" : "text-gray-500 group-hover/item:text-gray-700"
                    }`}>
                      {brand}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Price Filter */}
      <div className="border-b border-gray-150">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full py-4 text-left group"
        >
          <span className="text-[11px] font-display font-semibold text-[#0d0d0d] uppercase tracking-[0.15em]">
            Price
          </span>
          <ChevronIcon
            direction={openSections.price ? "up" : "down"}
            className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors"
          />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-out ${openSections.price ? "max-h-40 pb-5" : "max-h-0"}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
                placeholder="Min"
                className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0d0d0d] transition-colors"
              />
            </div>
            <span className="text-gray-300 text-sm">&mdash;</span>
            <div className="flex-1">
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
                placeholder="Max"
                className="w-full border border-gray-200 px-3 py-2 text-[13px] focus:outline-none focus:border-[#0d0d0d] transition-colors"
              />
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-[#0d0d0d] h-1"
          />
        </div>
      </div>

      {/* Tags Filter */}
      <div className="border-b border-gray-150">
        <button
          onClick={() => toggleSection("tags")}
          className="flex items-center justify-between w-full py-4 text-left group"
        >
          <span className="text-[11px] font-display font-semibold text-[#0d0d0d] uppercase tracking-[0.15em]">
            Tags
          </span>
          <ChevronIcon
            direction={openSections.tags ? "up" : "down"}
            className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 transition-colors"
          />
        </button>
        <div className={`overflow-hidden transition-all duration-300 ease-out ${openSections.tags ? "max-h-32 pb-4" : "max-h-0"}`}>
          <div className="space-y-1">
            <button
              onClick={onToggleSale}
              className="flex items-center gap-3 w-full py-1.5 group/item"
            >
              <div className={`w-4 h-4 border flex items-center justify-center transition-all duration-150 ${
                showOnSale ? "bg-[#0d0d0d] border-[#0d0d0d]" : "border-gray-300 group-hover/item:border-gray-500"
              }`}>
                {showOnSale && <CheckIcon />}
              </div>
              <span className={`text-[13px] transition-colors ${
                showOnSale ? "text-[#0d0d0d] font-medium" : "text-gray-500 group-hover/item:text-gray-700"
              }`}>
                On Sale
              </span>
            </button>
            <button
              onClick={onToggleNew}
              className="flex items-center gap-3 w-full py-1.5 group/item"
            >
              <div className={`w-4 h-4 border flex items-center justify-center transition-all duration-150 ${
                showNewOnly ? "bg-[#0d0d0d] border-[#0d0d0d]" : "border-gray-300 group-hover/item:border-gray-500"
              }`}>
                {showNewOnly && <CheckIcon />}
              </div>
              <span className={`text-[13px] transition-colors ${
                showNewOnly ? "text-[#0d0d0d] font-medium" : "text-gray-500 group-hover/item:text-gray-700"
              }`}>
                New Arrivals
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Clear All */}
      {activeCount > 0 && (
        <button
          onClick={onClearAll}
          className="w-full mt-5 py-2.5 text-[11px] font-display font-semibold uppercase tracking-[0.15em] text-gray-500 hover:text-[#0d0d0d] border border-gray-200 hover:border-[#0d0d0d] transition-all duration-200"
        >
          Clear All ({activeCount})
        </button>
      )}
    </div>
  );
});
FilterPanel.displayName = "FilterPanel";

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────

export default function CollectionPage({
  title,
  description,
  collectionHandle,
  breadcrumbs,
  subcategories,
  heroImage,
}: CollectionPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showOnSale, setShowOnSale] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const { addToCart } = useCart();

  // Close sort dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/collections/${collectionHandle}`);
        if (!res.ok) {
          // Fallback: fetch all products if collection not found
          const fallbackRes = await fetch("/api/products");
          const fallbackData = await fallbackRes.json();
          if (fallbackData.products) {
            setProducts(fallbackData.products);
            const prices = fallbackData.products.map((p: Product) => p.price);
            if (prices.length > 0) setPriceRange([0, Math.ceil(Math.max(...prices) / 100) * 100]);
          }
          return;
        }
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
          const prices = data.products.map((p: Product) => p.price);
          if (prices.length > 0) setPriceRange([0, Math.ceil(Math.max(...prices) / 100) * 100]);
        }
      } catch (error) {
        console.error("Error fetching collection:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, [collectionHandle]);

  // Derived data
  const brands = useMemo(() => {
    const set = new Set(products.map((p) => p.vendor));
    return Array.from(set).sort();
  }, [products]);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map((p) => p.price)) / 100) * 100;
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.vendor));
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (showOnSale) result = result.filter((p) => p.isSale);
    if (showNewOnly) result = result.filter((p) => p.isNew);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [products, selectedBrands, priceRange, showOnSale, showNewOnly, sortBy]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedBrands.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
    if (showOnSale) count++;
    if (showNewOnly) count++;
    return count;
  }, [selectedBrands, priceRange, maxPrice, showOnSale, showNewOnly]);

  // Handlers
  const handleQuickAdd = useCallback((product: Product) => {
    const firstVariant = product.variants[0];
    addToCart({
      id: product.id,
      variantId: firstVariant?.id || `${product.id}-default`,
      title: product.title,
      variant: firstVariant?.title || "Default",
      price: product.price,
      compareAtPrice: product.compareAtPrice || undefined,
      image: product.images[0] || "",
      handle: product.handle,
    });
  }, [addToCart]);

  const toggleBrand = useCallback((brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
    setShowOnSale(false);
    setShowNewOnly(false);
  }, [maxPrice]);

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* ─── Hero Section ─── */}
      <section className="relative pt-28 lg:pt-32 pb-14 lg:pb-20 bg-[#0d0d0d] overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Optional hero image — positioned as a faded right-side accent */}
        {heroImage && (
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 lg:opacity-30">
            <Image
              src={heroImage}
              alt=""
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent" />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mb-6 animate-fadeIn">
            <Link href="/" className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors font-display uppercase tracking-[0.15em]">
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="text-gray-600">/</span>
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-[11px] text-gray-300 font-display uppercase tracking-[0.15em]">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors font-display uppercase tracking-[0.15em]"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white tracking-tight mb-4 animate-fadeInUp">
            {title}
          </h1>
          <p className="text-gray-400 text-base lg:text-lg max-w-xl animate-fadeInUp stagger-1">
            {description}
          </p>

          {/* Subcategory Pills */}
          {subcategories && subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-8 animate-fadeInUp stagger-2">
              {subcategories.map((sub) => (
                <Link
                  key={sub.href}
                  href={sub.href}
                  className="px-4 py-2 text-[11px] font-display font-medium uppercase tracking-[0.12em] border border-white/20 text-white/70 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-200"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── Toolbar ─── */}
      <div className="border-b border-gray-100 bg-white sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Left: filter button + count */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 text-[11px] font-display font-semibold uppercase tracking-[0.12em] text-[#0d0d0d] hover:opacity-70 transition-opacity"
              >
                <FilterIcon />
                Filter
                {activeFilterCount > 0 && (
                  <span className="bg-[#0d0d0d] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <p className="text-[12px] text-gray-400">
                {isLoading ? (
                  <span className="inline-block w-20 h-3 bg-gray-100 rounded animate-pulse" />
                ) : (
                  <>
                    <span className="text-[#0d0d0d] font-medium">{filteredProducts.length}</span>
                    {" "}product{filteredProducts.length !== 1 ? "s" : ""}
                  </>
                )}
              </p>
            </div>

            {/* Right: sort + view */}
            <div className="flex items-center gap-3">
              {/* Custom Sort Dropdown */}
              <div ref={sortRef} className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-1.5 text-[11px] font-display font-semibold uppercase tracking-[0.12em] text-[#0d0d0d] hover:opacity-70 transition-opacity"
                >
                  {sortOptions.find((o) => o.value === sortBy)?.label}
                  <ChevronIcon direction={isSortOpen ? "up" : "down"} className="w-3 h-3" />
                </button>
                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 shadow-lg py-1 min-w-[180px] z-40 animate-slideDown">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2.5 text-[12px] transition-colors ${
                          sortBy === option.value
                            ? "text-[#0d0d0d] font-medium bg-gray-50"
                            : "text-gray-500 hover:text-[#0d0d0d] hover:bg-gray-50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View Toggle (Desktop) */}
              <div className="hidden lg:flex items-center border-l border-gray-200 pl-3 ml-1 gap-1">
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-1.5 transition-colors ${gridCols === 4 ? "text-[#0d0d0d]" : "text-gray-300 hover:text-gray-500"}`}
                  title="4 columns"
                >
                  <GridIcon filled={gridCols === 4} />
                </button>
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-1.5 transition-colors ${gridCols === 3 ? "text-[#0d0d0d]" : "text-gray-300 hover:text-gray-500"}`}
                  title="3 columns"
                >
                  <LargeGridIcon filled={gridCols === 3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ─── */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-56 flex-shrink-0">
              <div className="sticky top-36">
                <FilterPanel
                  brands={brands}
                  selectedBrands={selectedBrands}
                  onToggleBrand={toggleBrand}
                  priceRange={priceRange}
                  maxPrice={maxPrice}
                  onPriceChange={setPriceRange}
                  showOnSale={showOnSale}
                  onToggleSale={() => setShowOnSale(!showOnSale)}
                  showNewOnly={showNewOnly}
                  onToggleNew={() => setShowNewOnly(!showNewOnly)}
                  activeCount={activeFilterCount}
                  onClearAll={clearFilters}
                />
              </div>
            </aside>

            {/* Product Grid Area */}
            <div className="flex-1 min-w-0">
              {/* Active Filter Pills */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6 animate-fadeIn">
                  {selectedBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-[11px] font-display font-medium text-[#0d0d0d] uppercase tracking-wider hover:bg-gray-200 transition-colors"
                    >
                      {brand}
                      <CloseIcon size="sm" />
                    </button>
                  ))}
                  {showOnSale && (
                    <button
                      onClick={() => setShowOnSale(false)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-[11px] font-display font-medium text-[#c1272d] uppercase tracking-wider hover:bg-red-100 transition-colors"
                    >
                      On Sale
                      <CloseIcon size="sm" />
                    </button>
                  )}
                  {showNewOnly && (
                    <button
                      onClick={() => setShowNewOnly(false)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900/5 text-[11px] font-display font-medium text-[#0d0d0d] uppercase tracking-wider hover:bg-gray-900/10 transition-colors"
                    >
                      New
                      <CloseIcon size="sm" />
                    </button>
                  )}
                  <button
                    onClick={clearFilters}
                    className="text-[11px] text-gray-400 hover:text-[#0d0d0d] underline underline-offset-2 transition-colors ml-1"
                  >
                    Clear all
                  </button>
                </div>
              )}

              {/* Products Grid */}
              {isLoading ? (
                <div className={`grid gap-x-4 gap-y-8 grid-cols-2 ${
                  gridCols === 4 ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"
                }`}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductSkeleton key={i} index={i} />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-24">
                  <div className="w-16 h-16 mx-auto mb-6 border-2 border-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-7 h-7 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-display font-semibold text-[#0d0d0d] mb-2">
                    No products found
                  </h3>
                  <p className="text-sm text-gray-400 mb-8 max-w-sm mx-auto">
                    Try adjusting your filters or browse our full collection
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={clearFilters} className="btn-secondary text-[11px] px-6 py-3 min-h-0">
                      Clear Filters
                    </button>
                    <Link href="/shop" className="btn-primary text-[11px] px-6 py-3 min-h-0">
                      Shop All
                    </Link>
                  </div>
                </div>
              ) : (
                <div className={`grid gap-x-4 gap-y-10 grid-cols-2 ${
                  gridCols === 4 ? "md:grid-cols-3 lg:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3"
                }`}>
                  {filteredProducts.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickAdd={handleQuickAdd}
                      index={i}
                    />
                  ))}
                </div>
              )}

              {/* Results summary */}
              {!isLoading && filteredProducts.length > 0 && (
                <div className="mt-16 pt-8 border-t border-gray-100 text-center">
                  <p className="text-[12px] text-gray-400 font-display tracking-wider uppercase">
                    Showing {filteredProducts.length} of {products.length} products
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mobile Filter Drawer ─── */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
        isMobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}>
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMobileFilterOpen(false)}
        />

        {/* Drawer */}
        <div className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white transform transition-transform duration-300 ease-out ${
          isMobileFilterOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="flex items-center justify-between h-14 px-5 border-b border-gray-100">
            <h2 className="text-[13px] font-display font-semibold text-[#0d0d0d] uppercase tracking-[0.12em]">
              Filter
            </h2>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="p-2 -mr-2 hover:opacity-60 transition-opacity"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="p-5 overflow-y-auto h-[calc(100%-56px)]">
            <FilterPanel
              brands={brands}
              selectedBrands={selectedBrands}
              onToggleBrand={toggleBrand}
              priceRange={priceRange}
              maxPrice={maxPrice}
              onPriceChange={setPriceRange}
              showOnSale={showOnSale}
              onToggleSale={() => setShowOnSale(!showOnSale)}
              showNewOnly={showNewOnly}
              onToggleNew={() => setShowNewOnly(!showNewOnly)}
              activeCount={activeFilterCount}
              onClearAll={clearFilters}
            />

            {/* Apply button (mobile) */}
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full mt-8 btn-primary text-[11px]"
            >
              Show {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
