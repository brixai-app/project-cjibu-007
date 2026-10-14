import React, { useMemo, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { Filter, Search, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Product } from '@/types';
import { products, categories } from '@/data/mockData';
import { ProductCard } from '@/components/ProductCard';
import ProductDetailModal from '@/components/ProductDetailModal';
import { cn } from '@/lib/utils';

export function ShopPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [sort, setSort] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance');
  const [visibleCount, setVisibleCount] = useState(12);
  const [selected, setSelected] = useState<Product | undefined>(undefined);
  const [detailOpen, setDetailOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...(products ?? [])];
    if (category !== 'all') {
      list = list.filter(p => p?.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        p =>
          p?.name?.toLowerCase().includes(q) ??
          p?.category?.toLowerCase().includes(q)
      );
    }
    if (sort === 'price-asc') {
      list.sort((a, b) => (a?.price ?? 0) - (b?.price ?? 0));
    } else if (sort === 'price-desc') {
      list.sort((a, b) => (b?.price ?? 0) - (a?.price ?? 0));
    }
    return list;
  }, [search, category, sort]);

  const visibleProducts = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount]
  );

  const canLoadMore = visibleCount < filtered.length;

  const handleQuickPreview = (product: Product) => {
    setSelected(product);
    setDetailOpen(true);
  };

  const handleLoadMore = () => {
    setVisibleCount(c => c + 12);
    toast.success('Loaded more pieces from the collection.');
  };

  const handleSortChange = (value: 'relevance' | 'price-asc' | 'price-desc') => {
    setSort(value);
    toast.message('Sort updated', { description: value.replace('-', ' ') });
  };

  const FiltersContent = (
    <div className="space-y-4">
      <div>
        <div className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
          Category
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory('all')}
            className={cn(
              'px-3 py-1.5 text-xs border rounded-md transition-colors',
              category === 'all'
                ? 'border-[#FF6F61] text-[#000000] bg-[#FF6F61]/10'
                : 'border-gray-200 text-gray-600 hover:border-gray-400'
            )}
          >
            All
          </button>
          {(categories ?? []).map(cat => (
            <button
              key={cat?.id}
              type="button"
              onClick={() => setCategory(cat?.id ?? 'all')}
              className={cn(
                'px-3 py-1.5 text-xs border rounded-md transition-colors',
                category === cat?.id
                  ? 'border-[#FF6F61] text-[#000000] bg-[#FF6F61]/10'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              )}
            >
              {cat?.label ?? ''}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
          Sort
        </div>
        <div className="flex gap-2">
          {[
            { id: 'relevance', label: 'Featured' },
            { id: 'price-asc', label: 'Price: Low to High' },
            { id: 'price-desc', label: 'Price: High to Low' },
          ].map(opt => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSortChange(opt.id as typeof sort)}
              className={cn(
                'px-3 py-1.5 text-xs border rounded-md transition-colors whitespace-nowrap',
                sort === opt.id
                  ? 'border-[#FF6F61] text-[#000000] bg-[#FF6F61]/10'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="px-4 md:px-8 lg:px-16 py-8 md:py-10 max-w-6xl mx-auto">
        <header className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl tracking-tight text-[#2B2B2B]">
              The KLOTHS Edit
            </h1>
            <p className="mt-2 text-sm md:text-base text-[#6B7280] max-w-xl">
              Curated silhouettes, tactile textures, and considered essentials for your next in-store fitting.
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search pieces, cuts, colors..."
                className="w-full border border-[#E4E4E7] rounded-md bg-white pl-9 pr-3 py-2 text-xs md:text-sm text-[#2B2B2B] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#FF6F61]"
              />
            </div>
            <div className="flex items-center gap-2 md:hidden">
              <Dialog.Root open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E4E4E7] rounded-md text-xs text-[#2B2B2B]"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                  <Dialog.Content className="fixed inset-x-0 bottom-0 max-h-[80vh] rounded-t-2xl bg-white p-5 shadow-lg focus:outline-none">
                    <div className="flex items-center justify-between mb-4">
                      <Dialog.Title className="text-sm font-medium tracking-[0.18em] uppercase text-gray-500">
                        Refine selection
                      </Dialog.Title>
                      <Dialog.Close asChild>
                        <button
                          type="button"
                          className="text-xs text-gray-500 hover:text-gray-800"
                        >
                          Close
                        </button>
                      </Dialog.Close>
                    </div>
                    {FiltersContent}
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </header>
        <div className="hidden md:flex items-center justify-between mb-6">
          <div className="text-xs text-gray-500">
            Showing <span className="font-medium text-[#2B2B2B]">{visibleProducts.length}</span>{' '}
            of <span className="font-medium text-[#2B2B2B]">{filtered.length}</span> pieces
          </div>
          <div className="flex items-center gap-6">
            {FiltersContent}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 border border-[#E4E4E7] rounded-md px-3 py-2 text-xs text-[#2B2B2B] bg-white"
                >
                  Sort
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="bg-white border border-[#E4E4E7] rounded-md shadow-sm py-1 text-xs">
                <DropdownMenu.Item
                  className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer"
                  onSelect={() => handleSortChange('relevance')}
                >
                  Featured
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer"
                  onSelect={() => handleSortChange('price-asc')}
                >
                  Price: Low to High
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="px-3 py-1.5 hover:bg-gray-50 cursor-pointer"
                  onSelect={() => handleSortChange('price-desc')}
                >
                  Price: High to Low
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        </div>
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8"
        >
          {visibleProducts.map(product => (
            <motion.div
              key={product?.id ?? ''}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24 }}
            >
              <ProductCard product={product} onQuickPreview={handleQuickPreview} />
            </motion.div>
          ))}
        </motion.div>
        {filtered.length === 0 && (
          <div className="py-20 text-center text-sm text-gray-500">
            No pieces match your search. Try a softer filter or visit in-store for the full rail.
          </div>
        )}
        {canLoadMore && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={handleLoadMore}
              className="px-8 py-2.5 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase bg-[#FF6F61] text-[#000000] rounded-md hover:bg-[#F45A4C] transition-colors"
            >
              Load more
            </button>
          </div>
        )}
      </section>
      <ProductDetailModal
        open={detailOpen}
        onOpenChange={setDetailOpen}
        product={selected}
      />
    </>
  );
}

export default ShopPage;