import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types';
import { Size } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export type ProductDetailModalProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product?: Product;
};

export function ProductDetailModal({
  open = false,
  onOpenChange = () => {},
  product,
}: ProductDetailModalProps) {
  const { addItem, openCart } = useCart();
  const fallbackImage =
    product?.images?.[0] ??
    `https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80 ?? 'kloths'}/1200/800`;
  const [size, setSize] = React.useState<Size | null>(null);
  const [quantity, setQuantity] = React.useState<number>(1);

  React.useEffect(() => {
    if (open) {
      setSize(product?.sizes?.[0] ?? null);
      setQuantity(1);
    }
  }, [open, product?.sizes]);

  const handleAddToCart = () => {
    if (!product?.inStock) {
      toast.error('This piece is currently unavailable in-store.');
      return;
    }
    if (!size) {
      toast.error('Please select a size to continue.');
      return;
    }
    addItem(
      {
        id: crypto.randomUUID(),
        productId: product?.id ?? '',
        name: product?.name ?? 'Untitled piece',
        price: product?.price ?? 0,
        currency: product?.currency ?? '₹',
        size,
        color: product?.colors?.[0],
        image: fallbackImage,
      },
      quantity,
    );
    toast.success('Added to your KLOTHS selection.');
    openCart();
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-6"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <div className="relative grid w-full max-w-5xl grid-cols-1 gap-6 rounded-[16px] bg-white shadow-xl outline-none sm:grid-cols-[1.2fr_1fr]">
                  <button
                    type="button"
                    className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white/80 text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F61]"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close preview"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="group relative overflow-hidden rounded-l-[16px] bg-[#FAFAFA] sm:rounded-l-[16px] sm:rounded-r-none">
                    <img
                      src={fallbackImage}
                      crossOrigin="anonymous"
                      alt={product?.name ?? 'KLOTHS piece'}
                      className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-5 sm:p-7">
                    <Dialog.Title className="font-['Playfair_Display'] text-2xl font-light tracking-tight text-zinc-900 sm:text-3xl">
                      {product?.name ?? 'Curated piece'}
                    </Dialog.Title>
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="uppercase text-xs tracking-[0.2em] text-zinc-500">
                        {product?.category ?? 'collection'}
                      </p>
                      <p className="font-medium text-zinc-900">
                        {product?.currency ?? '₹'}
                        {product?.price?.toLocaleString() ?? '0'}
                      </p>
                    </div>
                    <Dialog.Description className="max-h-32 overflow-y-auto text-sm leading-relaxed text-zinc-600">
                      {product?.description ??
                        'A considered essential from the KLOTHS showroom, crafted to move effortlessly from daylight to after-hours.'}
                    </Dialog.Description>
                    <div className="mt-2 space-y-4">
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Size
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(product?.sizes ?? []).map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setSize(s)}
                              className={cn(
                                'min-w-[3rem] rounded-md border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.16em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F61]',
                                size === s
                                  ? 'border-[#FF6F61] bg-[#FF6F61] text-black'
                                  : 'border-zinc-300 bg-white text-zinc-700 hover:border-zinc-900',
                              )}
                            >
                              {s}
                            </button>
                          ))}
                          {(product?.sizes?.length ?? 0) === 0 && (
                            <span className="text-xs text-zinc-400">
                              Sizing details available in-store.
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                          Quantity
                        </p>
                        <div className="inline-flex items-center rounded-md border border-zinc-300 bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity((q) => (q > 1 ? q - 1 : 1))
                            }
                            className="inline-flex h-9 w-9 items-center justify-center border-r border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F61]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[3rem] text-center text-sm tabular-nums text-zinc-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setQuantity((q) => (q < 9 ? q + 1 : 9))
                            }
                            className="inline-flex h-9 w-9 items-center justify-center border-l border-zinc-200 text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F61]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={!product}
                        className={cn(
                          'inline-flex w-full items-center justify-center rounded-md bg-[#FF6F61] px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-[#F45A4C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F61]',
                          (!product || !product?.inStock) &&
                            'cursor-not-allowed opacity-60',
                        )}
                      >
                        {product?.inStock ? 'Add to selection' : 'View in store'}
                      </button>
                      <p className="text-[11px] leading-relaxed text-zinc-500">
                        This digital selection is a preview only. Our stylists
                        will finalize fit, tailoring, and availability with you
                        in-store.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}

export default ProductDetailModal;