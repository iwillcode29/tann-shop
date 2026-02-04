"use client";

import { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  {
    label: "Men",
    href: "/men",
    submenu: [
      { label: "New Arrivals", href: "/men/new" },
      { label: "Tees & Tanks", href: "/men/tees" },
      { label: "Long Sleeve & Hoodies", href: "/men/long-sleeve" },
      { label: "Shorts", href: "/men/shorts" },
      { label: "Pants & Tights", href: "/men/pants" },
      { label: "Accessories", href: "/men/accessories" },
    ],
  },
  {
    label: "Women",
    href: "/women",
    submenu: [
      { label: "New Arrivals", href: "/women/new" },
      { label: "Tees & Tanks", href: "/women/tees" },
      { label: "Sports Bras", href: "/women/bras" },
      { label: "Shorts & Skirts", href: "/women/shorts" },
      { label: "Pants & Tights", href: "/women/pants" },
      { label: "Accessories", href: "/women/accessories" },
    ],
  },
  {
    label: "Brands",
    href: "/brands",
    submenu: [
      { label: "District Vision", href: "/brands/district-vision" },
      { label: "Bandit Running", href: "/brands/bandit" },
      { label: "Soar", href: "/brands/soar" },
      { label: "Satisfy", href: "/brands/satisfy" },
      { label: "View All Brands", href: "/brands" },
    ],
  },
  {
    label: "Community",
    href: "/community",
  },
];

// Memoized icon components for performance
const SearchIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
));
SearchIcon.displayName = "SearchIcon";

const UserIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
));
UserIcon.displayName = "UserIcon";

const BagIcon = memo(() => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
));
BagIcon.displayName = "BagIcon";

const MenuIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
));
MenuIcon.displayName = "MenuIcon";

const CloseIcon = memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
  </svg>
));
CloseIcon.displayName = "CloseIcon";

const ChevronIcon = memo(({ className }: { className?: string }) => (
  <svg className={className || "w-4 h-4"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
  </svg>
));
ChevronIcon.displayName = "ChevronIcon";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const { itemCount, openCart } = useCart();

  // Optimized scroll handler with requestAnimationFrame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
    setExpandedMobileItem(null);
  }, []);

  const toggleMobileSubmenu = useCallback((label: string) => {
    setExpandedMobileItem(prev => prev === label ? null : label);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 text-center py-2.5 text-xs font-medium tracking-wider transition-all duration-300 ${
          isScrolled
            ? "bg-[#0d0d0d] text-white h-0 py-0 overflow-hidden opacity-0"
            : "bg-[#0d0d0d] text-white opacity-100"
        }`}
      >
        <span className="font-display">FREE SHIPPING ON ORDERS OVER $150</span>
        <span className="mx-3 text-white/30">|</span>
        <span className="text-white/80">USE CODE: <span className="font-semibold text-white">RUNFAST</span></span>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "top-0 bg-white/98 backdrop-blur-md shadow-sm"
            : "top-10 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Mobile menu button - Improved touch target */}
            <button
              className="lg:hidden p-2 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              <span className={`transition-colors ${isScrolled ? "text-[#0d0d0d]" : "text-white"}`}>
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveSubmenu(item.label)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`nav-link flex items-center gap-1 text-[13px] font-display font-medium tracking-wide uppercase transition-colors py-2 ${
                      isScrolled
                        ? "text-[#0d0d0d] hover:text-black"
                        : "text-white hover:text-white/80"
                    }`}
                  >
                    {item.label}
                    {item.submenu && (
                      <ChevronIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${activeSubmenu === item.label ? "rotate-180" : ""}`} />
                    )}
                  </Link>

                  {/* Desktop Dropdown */}
                  {item.submenu && activeSubmenu === item.label && (
                    <div className="absolute top-full left-0 pt-3">
                      <div className="animate-slideDown bg-white shadow-xl rounded-sm py-3 min-w-[220px] border border-gray-100">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0d0d0d] transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Logo - Centered */}
            <Link
              href="/"
              className={`absolute left-1/2 -translate-x-1/2 text-2xl lg:text-3xl font-display font-bold tracking-tight transition-colors ${
                isScrolled ? "text-[#0d0d0d]" : "text-white"
              }`}
            >
              TANN
            </Link>

            {/* Right side icons - Improved touch targets */}
            <div className="flex items-center">
              {/* Search */}
              <button
                className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 transition-colors ${
                  isScrolled ? "text-[#0d0d0d]" : "text-white"
                }`}
                aria-label="Search"
              >
                <SearchIcon />
              </button>

              {/* Account - Hidden on small mobile */}
              <button
                className={`hidden sm:flex p-2 min-w-[44px] min-h-[44px] items-center justify-center rounded-full hover:bg-black/5 transition-colors ${
                  isScrolled ? "text-[#0d0d0d]" : "text-white"
                }`}
                aria-label="Account"
              >
                <UserIcon />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-black/5 transition-colors relative ${
                  isScrolled ? "text-[#0d0d0d]" : "text-white"
                }`}
                aria-label={`Shopping bag${itemCount > 0 ? ` (${itemCount} items)` : ""}`}
              >
                <BagIcon />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#e63946] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {itemCount > 9 ? "9+" : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 z-40 w-full max-w-sm bg-white transform transition-transform duration-300 ease-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          <Link href="/" className="text-2xl font-display font-bold tracking-tight text-[#0d0d0d]" onClick={toggleMobileMenu}>
            TANN
          </Link>
          <button
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto h-[calc(100%-64px)] overscroll-contain">
          <nav className="py-4">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-50">
                {item.submenu ? (
                  <>
                    <button
                      className="flex items-center justify-between w-full px-6 py-4 text-left"
                      onClick={() => toggleMobileSubmenu(item.label)}
                      aria-expanded={expandedMobileItem === item.label}
                    >
                      <span className="text-base font-display font-medium text-[#0d0d0d]">
                        {item.label}
                      </span>
                      <ChevronIcon
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                          expandedMobileItem === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile Submenu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        expandedMobileItem === item.label ? "max-h-96" : "max-h-0"
                      }`}
                    >
                      <div className="bg-gray-50 pb-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-8 py-3 text-sm text-gray-600 hover:text-[#0d0d0d] transition-colors"
                            onClick={toggleMobileMenu}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-6 py-4 text-base font-display font-medium text-[#0d0d0d]"
                    onClick={toggleMobileMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="px-6 py-6 border-t border-gray-100 mt-4">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/account"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0d0d0d] transition-colors"
                onClick={toggleMobileMenu}
              >
                <UserIcon />
                <span>Account</span>
              </Link>
            </div>
            <p className="text-xs text-gray-400">
              Free shipping on orders over $150
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
