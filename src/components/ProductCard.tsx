import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '@/types';
import { Size } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export type ProductCardProps = {
  product?: Product;
  onQuickPreview?: (product: Product) => void;
  className?: string;
};

export function ProductCard({
  product,
  onQuickPreview,
  className,
}: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const resolvedProduct = product ?? {
    id: 'placeholder',
    name: 'Untitled Piece',
    slug: 'untitled-piece',
    category: 'womens',
    price: 0,
    currency: '₹',
    sizes: ['S', 'M', 'L'] as Size[],
    colors: ['Black'],
    description: 'Refined minimal staple.',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
    ],
    featured: false,
    tags: [],
    inStock: false,
  };

  const handleQuickPreview = () => {
    if (!resolvedProduct?.id) return;
    if (onQuickPreview) {
      onQuickPreview(resolvedProduct);
    }
  };

  const handleQuickAdd = () => {
    if (!resolvedProduct?.inStock) {
      toast.error('This piece is currently unavailable.');
      return;
    }
    const defaultSize = (resolvedProduct?.sizes?.[0] ?? 'M') as Size;
    const defaultColor = resolvedProduct?.colors?.[0] ?? 'Black';
    const image = resolvedProduct?.images?.[0] ?? '';
    addItem(
      {
        id: `${resolvedProduct?.id}-${defaultSize}-${defaultColor}`,
        productId: resolvedProduct?.id ?? '',
        name: resolvedProduct?.name ?? 'Selected Piece',
        price: resolvedProduct?.price ?? 0,
        currency: resolvedProduct?.currency ?? '₹',
        size: defaultSize,
        color: defaultColor,
        image,
      },
      1,
    );
    toast.success('Added to your selection', {
      description: `${resolvedProduct?.name ?? 'Piece'} · ${defaultSize} · ${defaultColor}`,
    });
    openCart();
  };

  const formattedPrice = `${resolvedProduct?.currency ?? '₹'}${(resolvedProduct?.price ?? 0).toLocaleString('en-IN')}`;

  const isDisabled = !resolvedProduct?.inStock;

  return (
    <motion.article
      className={cn(
        'group flex h-full flex-col rounded-[16px] bg-white shadow-sm ring-1 ring-[#E4E4E7]/80 transition hover:-translate-y-1 hover:shadow-md',
        className,
      )}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="relative overflow-hidden rounded-t-[16px]">
        <div className="aspect-[3/4] w-full overflow-hidden bg-[#FAFAFA]">
          <img
            src={
              resolvedProduct?.images?.[0] ??
              `https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85 ?? 'kloths'}/1200/1600`
            }
            crossOrigin="anonymous"
            alt={resolvedProduct?.name ?? 'Product image'}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:translate-y-3 md:group-hover:translate-y-0">
          <button
            type="button"
            onClick={handleQuickPreview}
            className="pointer-events-auto inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-white/95 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2B2B2B] shadow-sm transition hover:bg-white"
          >
            <Eye className="h-4 w-4" />
            Quick Preview
          </button>
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isDisabled}
            className={cn(
              'pointer-events-auto inline-flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] shadow-sm transition',
              isDisabled
                ? 'bg-[#E4E4E7] text-[#6B7280] cursor-not-allowed'
                : 'bg-[#FF6F61] text-black hover:bg-[#F45A4C]',
            )}
          >
            <ShoppingBag className="h-4 w-4" />
            {isDisabled ? 'Out of Stock' : 'Quick Add'}
          </button>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7280]">
          <span>{resolvedProduct?.category ?? 'edit'}</span>
          {resolvedProduct?.tags?.[0] && (
            <span>{resolvedProduct?.tags?.[0] ?? ''}</span>
          )}
        </div>
        <h3 className="line-clamp-1 font-['Playfair Display'] text-lg font-normal text-[#2B2B2B]">
          {resolvedProduct?.name ?? 'Untitled Piece'}
        </h3>
        <div className="mt-2 flex items-center justify-between text-sm">
          <span className="font-semibold text-[#2B2B2B]">{formattedPrice}</span>
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#6B7280]">
            {resolvedProduct?.inStock ? 'Available In-Store' : 'Visit To Enquire'}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;