import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export type CartDrawerProps = {
  triggerClassName?: string;
};

export function CartDrawer({ triggerClassName = '' }: CartDrawerProps) {
  const {
    items,
    isOpen,
    subtotal,
    itemCount,
    shippingProgress,
    freeShippingThreshold,
    openCart,
    closeCart,
    setItemQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const handleDecrease = (id: string, quantity: number) => {
    const next = quantity - 1;
    if (next <= 0) {
      removeItem(id);
    } else {
      setItemQuantity(id, next);
    }
  };

  const handleCheckout = () => {
    if (items?.length ?? 0) {
      clearCart();
    }
  };

  const shippingRemaining = Math.max(freeShippingThreshold - subtotal, 0);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: items?.[0]?.currency ?? 'INR',
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => (open ? openCart() : closeCart())}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          onClick={() => openCart()}
          className={`relative flex items-center gap-2 text-[#2B2B2B] hover:text-black transition ${triggerClassName}`}
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xs tracking-[0.2em] uppercase hidden sm:inline">
            Cart
          </span>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 min-w-[1.25rem] px-1 rounded-full bg-[#FF6F61] text-[10px] leading-5 text-black text-center">
              {itemCount}
            </span>
          )}
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.aside
                className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-xl border-l border-[#E4E4E7] flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.32, ease: [0.25, 0.8, 0.25, 1] }}
              >
                <header className="flex items-center justify-between px-6 py-5 border-b border-[#E4E4E7]">
                  <div>
                    <Dialog.Title className="font-['Playfair_Display'] text-2xl tracking-tight text-[#2B2B2B]">
                      Your Selection
                    </Dialog.Title>
                    <Dialog.Description className="text-xs uppercase tracking-[0.2em] text-[#6B7280] mt-1">
                      {itemCount ?? 0} item{(itemCount ?? 0) !== 1 ? 's' : ''} curated
                    </Dialog.Description>
                  </div>
                  <button
                    type="button"
                    onClick={() => closeCart()}
                    className="p-2 rounded-md border border-transparent hover:border-[#E4E4E7] hover:bg-[#FAFAFA] transition"
                    aria-label="Close cart"
                  >
                    <X className="h-5 w-5 text-[#2B2B2B]" />
                  </button>
                </header>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                  {items?.length ? (
                    items.map((item) => (
                      <div
                        key={item?.id ?? ''}
                        className="flex gap-4 border-b border-[#F4F4F5] pb-4 last:border-b-0"
                      >
                        <div className="relative w-20 sm:w-24 flex-shrink-0 overflow-hidden rounded-xl bg-[#FAFAFA]">
                          <img
                            src={item?.image ?? ''}
                            crossOrigin="anonymous"
                            alt={item?.name ?? ''}
                            className="h-full w-full object-cover aspect-[3/4]"
                          />
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium text-[#2B2B2B] line-clamp-2">
                                {item?.name ?? ''}
                              </p>
                              <p className="mt-1 text-xs text-[#6B7280]">
                                Size {item?.size ?? ''}{' '}
                                {item?.color ? `· ${item.color}` : ''}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item?.id ?? '')}
                              className="p-1 text-[#6B7280] hover:text-[#2B2B2B]"
                              aria-label="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center border border-[#E4E4E7] rounded-full px-2 py-1">
                              <button
                                type="button"
                                onClick={() =>
                                  handleDecrease(item?.id ?? '', item?.quantity ?? 1)
                                }
                                className="p-1 text-xs text-[#2B2B2B] hover:text-black"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="mx-2 text-xs text-[#2B2B2B]">
                                {item?.quantity ?? 0}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setItemQuantity(
                                    item?.id ?? '',
                                    (item?.quantity ?? 0) + 1
                                  )
                                }
                                className="p-1 text-xs text-[#2B2B2B] hover:text-black"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="text-sm font-semibold text-[#2B2B2B]">
                              {formatCurrency((item?.price ?? 0) * (item?.quantity ?? 0))}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-[#6B7280] space-y-3">
                      <ShoppingBag className="h-10 w-10" />
                      <p className="text-sm tracking-wide">
                        Your cart is currently empty.
                      </p>
                      <p className="text-xs uppercase tracking-[0.2em]">
                        Discover pieces to add
                      </p>
                    </div>
                  )}
                </div>
                <footer className="border-t border-[#E4E4E7] px-6 py-5 space-y-4 bg-[#FAFAFA]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#6B7280]">
                      <span>
                        {shippingRemaining > 0
                          ? `₹${shippingRemaining.toLocaleString()} away from complimentary shipping`
                          : 'Complimentary shipping unlocked'}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em]">
                        {Math.round(shippingProgress ?? 0)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#E4E4E7] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#FF6F61]"
                        style={{ width: `${Math.min(shippingProgress ?? 0, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="uppercase tracking-[0.18em] text-[#6B7280]">
                      Subtotal
                    </span>
                    <span className="text-base font-semibold text-[#2B2B2B]">
                      {formatCurrency(subtotal ?? 0)}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={!items?.length}
                    onClick={() => handleCheckout()}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FF6F61] text-black text-xs font-semibold tracking-[0.2em] uppercase py-3 rounded-[16px] disabled:opacity-50 disabled:cursor-not-allowed transition-colors hover:bg-[#F45A4C]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRightIcon />
                  </button>
                  <p className="text-[10px] text-[#6B7280] tracking-[0.18em] uppercase text-center">
                    In-store fittings & alterations available
                  </p>
                </footer>
              </motion.aside>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M4 8h7.5M8.5 4.5 11.9 8l-3.4 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CartDrawer;