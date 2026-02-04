"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { createCart, isShopifyConfigured } from "@/lib/shopify";

const CloseIcon = memo(() => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
));
CloseIcon.displayName = "CloseIcon";

const MinusIcon = memo(() => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12H4"
    />
  </svg>
));
MinusIcon.displayName = "MinusIcon";

const PlusIcon = memo(() => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
));
PlusIcon.displayName = "PlusIcon";

const TrashIcon = memo(() => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
));
TrashIcon.displayName = "TrashIcon";

const ShoppingBagIcon = memo(() => (
  <svg
    className="w-16 h-16 text-gray-300"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
));
ShoppingBagIcon.displayName = "ShoppingBagIcon";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    itemCount,
    subtotal,
    updateQuantity,
    removeFromCart,
    closeCart,
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);

    try {
      // Check if we have valid Shopify variant IDs (they start with "gid://")
      const hasShopifyVariants = items.some((item) =>
        item.variantId.startsWith("gid://")
      );

      if (isShopifyConfigured && hasShopifyVariants) {
        // Create Shopify cart with items
        const lines = items.map((item) => ({
          merchandiseId: item.variantId,
          quantity: item.quantity,
        }));

        const cart = await createCart(lines);

        if (cart?.checkoutUrl) {
          // Redirect to Shopify checkout
          window.location.href = cart.checkoutUrl;
          return;
        }
      }

      // Fallback: If no Shopify products, show message
      alert(
        "To complete checkout, please add products to your Shopify store first.\n\n" +
          "Go to: tann-shop-2083.myshopify.com/admin/products"
      );
    } catch (error) {
      console.error("Checkout error:", error);
      alert("There was an error processing checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
          <h2 className="text-lg font-display font-semibold text-[#0d0d0d]">
            Your Cart
            {itemCount > 0 && (
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            )}
          </h2>
          <button
            className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-[calc(100%-64px)]">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
              <ShoppingBagIcon />
              <h3 className="mt-4 text-lg font-display font-medium text-[#0d0d0d]">
                Your cart is empty
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Looks like you haven&apos;t added anything yet.
              </p>
              <button
                onClick={closeCart}
                className="mt-6 btn-primary px-8"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li
                      key={item.variantId}
                      className="flex gap-4 pb-4 border-b border-gray-100 last:border-0"
                    >
                      {/* Product Image */}
                      <Link
                        href={`/products/${item.handle}`}
                        onClick={closeCart}
                        className="relative w-20 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0"
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.handle}`}
                          onClick={closeCart}
                          className="block"
                        >
                          <h4 className="text-sm font-medium text-[#0d0d0d] truncate hover:underline">
                            {item.title}
                          </h4>
                        </Link>
                        {item.variant && (
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.variant}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium text-[#0d0d0d]">
                            {formatPrice(item.price)}
                          </span>
                          {item.compareAtPrice &&
                            item.compareAtPrice > item.price && (
                              <span className="text-xs text-gray-400 line-through">
                                {formatPrice(item.compareAtPrice)}
                              </span>
                            )}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-200 rounded">
                            <button
                              onClick={() =>
                                updateQuantity(item.variantId, item.quantity - 1)
                              }
                              className="p-2 hover:bg-gray-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <MinusIcon />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.variantId, item.quantity + 1)
                              }
                              className="p-2 hover:bg-gray-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <PlusIcon />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.variantId)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label={`Remove ${item.title} from cart`}
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 px-6 py-4 bg-white">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-lg font-display font-semibold text-[#0d0d0d]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-4">
                  Shipping and taxes calculated at checkout.
                </p>

                {/* Checkout Button */}
                <button
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full mt-3 text-sm text-gray-600 hover:text-[#0d0d0d] transition-colors py-2"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
