"use client";

import { useState, useEffect, useMemo, useCallback, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

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

// Icons
const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = "SearchIcon";

const FilterIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
  </svg>
));
FilterIcon.displayName = "FilterIcon";

const CloseIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
CloseIcon.displayName = "CloseIcon";

const GridIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
));
GridIcon.displayName = "GridIcon";

const ListIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
  </svg>
));
ListIcon.displayName = "ListIcon";

const ChevronIcon = memo(({ className, direction = "down" }: { className?: string; direction?: "up" | "down" }) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={direction === "up" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
  </svg>
));
ChevronIcon.displayName = "ChevronIcon";

const CheckIcon = memo(() => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
));
CheckIcon.displayName = "CheckIcon";

type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

// Product Card Component
const ProductCard = memo(({ product, onQuickAdd, viewMode }: {
  product: Product;
  onQuickAdd: (product: Product) => void;
  viewMode: "grid" | "list";
}) => {
  const isGrid = viewMode === "grid";

  return (
    <div className={`group product-card ${isGrid ? "" : "flex gap-6"}`}>
      <Link
        href={`/products/${product.handle}`}
        className={`block ${isGrid ? "" : "w-48 flex-shrink-0"}`}
      >
        <div className={`relative bg-[#f5f5f5] overflow-hidden ${isGrid ? "aspect-[3/4]" : "aspect-square"}`}>
          <Image
            src={product.images[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes={isGrid ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" : "192px"}
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt=""
              fill
              className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              sizes={isGrid ? "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" : "192px"}
            />
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-[#0d0d0d] text-white text-[10px] font-display font-semibold px-2.5 py-1 uppercase tracking-wider">
                New
              </span>
            )}
            {product.isSale && (
              <span className="bg-[#e63946] text-white text-[10px] font-display font-semibold px-2.5 py-1 uppercase tracking-wider">
                Sale
              </span>
            )}
          </div>

          {/* Quick Add */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickAdd(product);
              }}
              className="w-full bg-[#0d0d0d] text-white py-3 text-xs font-display font-semibold uppercase tracking-wider hover:bg-[#1a1a1a] transition-colors"
            >
              Quick Add
            </button>
          </div>
        </div>
      </Link>

      <div className={`${isGrid ? "mt-4" : "flex-1 py-2"}`}>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-display mb-1">
          {product.vendor}
        </p>
        <Link href={`/products/${product.handle}`}>
          <h3 className={`font-medium text-[#0d0d0d] group-hover:underline underline-offset-2 ${isGrid ? "text-sm" : "text-base"}`}>
            {product.title}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className={`font-semibold text-[#0d0d0d] ${isGrid ? "text-sm" : "text-base"}`}>
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        {!isGrid && product.variants.length > 1 && (
          <p className="text-xs text-gray-500 mt-2">
            {product.variants.length} variants available
          </p>
        )}
      </div>
    </div>
  );
});
ProductCard.displayName = "ProductCard";

// Filter Section Component
const FilterSection = memo(({
  title,
  isOpen,
  onToggle,
  children
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => (
  <div className="border-b border-gray-200 py-4">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left"
    >
      <span className="text-sm font-display font-semibold text-[#0d0d0d] uppercase tracking-wider">
        {title}
      </span>
      <ChevronIcon direction={isOpen ? "up" : "down"} className="w-4 h-4 text-gray-400" />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 mt-4" : "max-h-0"}`}>
      {children}
    </div>
  </div>
));
FilterSection.displayName = "FilterSection";

// Loading Skeleton
const ProductSkeleton = memo(() => (
  <div className="animate-pulse">
    <div className="aspect-[3/4] bg-gray-200" />
    <div className="mt-4 space-y-2">
      <div className="h-3 w-16 bg-gray-200 rounded" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
      <div className="h-4 w-20 bg-gray-200 rounded" />
    </div>
  </div>
));
ProductSkeleton.displayName = "ProductSkeleton";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showOnSale, setShowOnSale] = useState(false);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState({
    brand: true,
    price: true,
    availability: false,
  });

  const { addToCart } = useCart();

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.products) {
          setProducts(data.products);
          // Set initial price range based on products
          const prices = data.products.map((p: Product) => p.price);
          if (prices.length > 0) {
            setPriceRange([0, Math.ceil(Math.max(...prices) / 100) * 100]);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Get unique brands
  const brands = useMemo(() => {
    const brandSet = new Set(products.map((p) => p.vendor));
    return Array.from(brandSet).sort();
  }, [products]);

  // Get max price
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 1000;
    return Math.ceil(Math.max(...products.map((p) => p.price)) / 100) * 100;
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.vendor.toLowerCase().includes(query)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.vendor));
    }

    // Price filter
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sale filter
    if (showOnSale) {
      result = result.filter((p) => p.isSale);
    }

    // New only filter
    if (showNewOnly) {
      result = result.filter((p) => p.isNew);
    }

    // Sort
    switch (sortBy) {
      case "newest":
        // Keep original order (assuming newest first from API)
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  }, [products, searchQuery, selectedBrands, priceRange, showOnSale, showNewOnly, sortBy]);

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
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedBrands([]);
    setPriceRange([0, maxPrice]);
    setShowOnSale(false);
    setShowNewOnly(false);
  }, [maxPrice]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedBrands.length > 0) count++;
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++;
    if (showOnSale) count++;
    if (showNewOnly) count++;
    return count;
  }, [selectedBrands, priceRange, maxPrice, showOnSale, showNewOnly]);

  // Filter sidebar content
  const filterContent = (
    <>
      {/* Brand Filter */}
      <FilterSection
        title="Brand"
        isOpen={openFilters.brand}
        onToggle={() => setOpenFilters((prev) => ({ ...prev, brand: !prev.brand }))}
      >
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div
                className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
                  selectedBrands.includes(brand)
                    ? "bg-[#0d0d0d] border-[#0d0d0d]"
                    : "border-gray-300 group-hover:border-gray-400"
                }`}
              >
                {selectedBrands.includes(brand) && (
                  <CheckIcon />
                )}
              </div>
              <span className={`text-sm ${selectedBrands.includes(brand) ? "text-[#0d0d0d] font-medium" : "text-gray-600"}`}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Price Filter */}
      <FilterSection
        title="Price"
        isOpen={openFilters.price}
        onToggle={() => setOpenFilters((prev) => ({ ...prev, price: !prev.price }))}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0d0d0d]"
              />
            </div>
            <span className="text-gray-400 mt-5">—</span>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Max</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-[#0d0d0d]"
              />
            </div>
          </div>
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full accent-[#0d0d0d]"
          />
        </div>
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection
        title="Availability"
        isOpen={openFilters.availability}
        onToggle={() => setOpenFilters((prev) => ({ ...prev, availability: !prev.availability }))}
      >
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
                showOnSale
                  ? "bg-[#0d0d0d] border-[#0d0d0d]"
                  : "border-gray-300 group-hover:border-gray-400"
              }`}
              onClick={() => setShowOnSale(!showOnSale)}
            >
              {showOnSale && <CheckIcon />}
            </div>
            <span className={`text-sm ${showOnSale ? "text-[#0d0d0d] font-medium" : "text-gray-600"}`}>
              On Sale
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
                showNewOnly
                  ? "bg-[#0d0d0d] border-[#0d0d0d]"
                  : "border-gray-300 group-hover:border-gray-400"
              }`}
              onClick={() => setShowNewOnly(!showNewOnly)}
            >
              {showNewOnly && <CheckIcon />}
            </div>
            <span className={`text-sm ${showNewOnly ? "text-[#0d0d0d] font-medium" : "text-gray-600"}`}>
              New Arrivals
            </span>
          </label>
        </div>
      </FilterSection>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full mt-6 py-3 border border-[#0d0d0d] text-sm font-display font-semibold uppercase tracking-wider text-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-white transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </>
  );

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-28 lg:pt-32 pb-12 bg-[#0d0d0d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-4 animate-fadeInUp">
              All Products
            </h1>
            <p className="text-gray-400 text-lg animate-fadeInUp stagger-1">
              Discover our complete collection of premium running gear
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl animate-fadeInUp stagger-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 px-5 py-4 pl-12 text-base focus:outline-none focus:border-white/40 transition-colors"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:gap-12">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <h2 className="text-lg font-display font-bold text-[#0d0d0d] mb-6">
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({activeFilterCount} active)
                    </span>
                  )}
                </h2>
                {filterContent}
              </div>
            </aside>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 text-sm font-medium hover:border-[#0d0d0d] transition-colors"
                  >
                    <FilterIcon />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="bg-[#0d0d0d] text-white text-xs px-2 py-0.5 rounded-full">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>

                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-[#0d0d0d]">{filteredProducts.length}</span> products
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:border-[#0d0d0d] bg-white"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center border border-gray-200">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-[#0d0d0d] text-white" : "text-gray-400 hover:text-[#0d0d0d]"}`}
                    >
                      <GridIcon />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-[#0d0d0d] text-white" : "text-gray-400 hover:text-[#0d0d0d]"}`}
                    >
                      <ListIcon />
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Filters */}
              {(selectedBrands.length > 0 || showOnSale || showNewOnly) && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {selectedBrands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-sm text-[#0d0d0d] hover:bg-gray-200 transition-colors"
                    >
                      {brand}
                      <CloseIcon />
                    </button>
                  ))}
                  {showOnSale && (
                    <button
                      onClick={() => setShowOnSale(false)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#e63946]/10 text-sm text-[#e63946] hover:bg-[#e63946]/20 transition-colors"
                    >
                      On Sale
                      <CloseIcon />
                    </button>
                  )}
                  {showNewOnly && (
                    <button
                      onClick={() => setShowNewOnly(false)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#0d0d0d]/10 text-sm text-[#0d0d0d] hover:bg-[#0d0d0d]/20 transition-colors"
                    >
                      New Arrivals
                      <CloseIcon />
                    </button>
                  )}
                </div>
              )}

              {/* Product Grid */}
              {isLoading ? (
                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-display font-semibold text-[#0d0d0d] mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your search or filters
                  </p>
                  <button
                    onClick={clearFilters}
                    className="btn-primary"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onQuickAdd={handleQuickAdd}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileFilterOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white transform transition-transform duration-300 ${
            isMobileFilterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
            <h2 className="text-lg font-display font-semibold text-[#0d0d0d]">
              Filters
            </h2>
            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="p-2"
            >
              <CloseIcon />
            </button>
          </div>
          <div className="p-6 overflow-y-auto h-[calc(100%-64px)]">
            {filterContent}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
