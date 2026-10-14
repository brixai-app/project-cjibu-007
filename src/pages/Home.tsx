import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { heroSlides, products, storeDetails } from '@/data/mockData';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

export function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [previewProduct, setPreviewProduct] = useState<Product | undefined>(undefined);

  const featuredProducts = useMemo(
    () => products?.filter(p => p?.featured)?.slice(0, 5) ?? [],
    []
  );

  const currentSlide = heroSlides?.[activeSlide] ?? heroSlides?.[0];

  const handleNextSlide = () => {
    if (!heroSlides?.length) return;
    setActiveSlide(prev => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    if (!heroSlides?.length) return;
    setActiveSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#2B2B2B]">
      <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides?.map((slide, index) => (
            <motion.div
              key={slide?.id ?? index}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{
                opacity: index === activeSlide ? 1 : 0,
                scale: index === activeSlide ? 1 : 1.02,
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <img
                src={slide?.image ?? ''}
                crossOrigin="anonymous"
                alt={slide?.title ?? 'KLOTHS Lookbook'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.25),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(0,0,0,0.35),_transparent_55%)]" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div
            className={`w-full px-6 sm:px-10 lg:px-16 xl:px-24 ${
              currentSlide?.alignment === 'right'
                ? 'flex justify-end'
                : 'flex justify-start'
            }`}
          >
            <div className="max-w-xl bg-white/80 backdrop-blur-md border border-[#E4E4E7] rounded-[16px] p-6 sm:p-8">
              <p className="uppercase tracking-[0.25em] text-xs text-[#6B7280] mb-4">
                {currentSlide?.subtitle ?? 'Editorial Capsule'}
              </p>
              <h1 className="font-[Playfair Display] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-4">
                {currentSlide?.title ?? 'KLOTHS Showcase'}
              </h1>
              <p className="font-[Inter] text-sm sm:text-base text-[#6B7280] mb-6">
                {currentSlide?.description ??
                  'A curated in-person fashion experience crafted with architectural silhouettes and tactile minimalism.'}
              </p>
              <div className="flex items-center gap-4">
                <Link
                  to={currentSlide?.ctaHref ?? '/products'}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6F61] text-black text-xs font-semibold tracking-[0.2em] uppercase rounded-md hover:bg-[#F45A4C] transition-colors"
                >
                  {currentSlide?.ctaLabel ?? 'Explore Collection'}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={handleNextSlide}
                  className="text-xs tracking-[0.25em] uppercase text-[#6B7280] hover:text-[#2B2B2B]"
                >
                  Next Story
                </button>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2">
                  {heroSlides?.map((slide, index) => (
                    <button
                      key={slide?.id ?? index}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-1.5 rounded-full transition-all ${
                        index === activeSlide
                          ? 'w-10 bg-[#FF6F61]'
                          : 'w-4 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-3 text-xs text-[#6B7280]">
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    className="hover:text-[#2B2B2B]"
                  >
                    Prev
                  </button>
                  <span>/</span>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    className="hover:text-[#2B2B2B]"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 py-16 md:py-20">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="uppercase tracking-[0.25em] text-xs text-[#6B7280] mb-3">
              Featured Edit
            </p>
            <h2 className="font-[Playfair Display] text-3xl sm:text-4xl font-light tracking-tight">
              Gallery of considered essentials
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase"
          >
            View full collection
            <ArrowRight className="w-4 h-4" />
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[1fr]">
          <div className="md:col-span-5 flex flex-col gap-6">
            {featuredProducts?.[0] && (
              <motion.div
                layout
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full"
              >
                <ProductCard
                  product={featuredProducts[0]}
                  onQuickPreview={p => setPreviewProduct(p)}
                  className="h-full"
                />
              </motion.div>
            )}
            {featuredProducts?.[1] && (
              <motion.div
                layout
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <ProductCard
                  product={featuredProducts[1]}
                  onQuickPreview={p => setPreviewProduct(p)}
                />
              </motion.div>
            )}
          </div>

          <div className="md:col-span-4 flex flex-col gap-6">
            {featuredProducts?.[2] && (
              <motion.div
                layout
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <ProductCard
                  product={featuredProducts[2]}
                  onQuickPreview={p => setPreviewProduct(p)}
                />
              </motion.div>
            )}
            {featuredProducts?.[3] && (
              <motion.div
                layout
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <ProductCard
                  product={featuredProducts[3]}
                  onQuickPreview={p => setPreviewProduct(p)}
                />
              </motion.div>
            )}
          </div>

          <div className="md:col-span-3">
            {featuredProducts?.[4] && (
              <motion.div
                layout
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full"
              >
                <ProductCard
                  product={featuredProducts[4]}
                  onQuickPreview={p => setPreviewProduct(p)}
                  className="h-full"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 xl:px-24 pb-20">
        <div className="grid md:grid-cols-2 gap-10 items-stretch bg-white border border-[#E4E4E7] rounded-[16px] overflow-hidden">
          <div className="p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <p className="uppercase tracking-[0.25em] text-xs text-[#6B7280] mb-3">
                Visit the atelier
              </p>
              <h3 className="font-[Playfair Display] text-2xl sm:text-3xl font-light mb-4">
                Experience KLOTHS in person
              </h3>
              <p className="font-[Inter] text-sm text-[#6B7280] mb-6">
                Step inside our studio at{' '}
                {storeDetails?.addressLine1 ?? 'our flagship space'}, where every
                garment is curated to be touched, tried, and styled with you.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="text-sm">
                <p className="font-semibold">
                  {storeDetails?.city ?? 'Your City'},{' '}
                  {storeDetails?.region ?? ''}
                </p>
                <p className="text-[#6B7280]">
                  {storeDetails?.addressLine1 ?? ''}
                  {storeDetails?.addressLine2
                    ? `, ${storeDetails.addressLine2}`
                    : ''}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-[#6B7280]">
                <span>{storeDetails?.phone ?? ''}</span>
                <span>•</span>
                <span>{storeDetails?.email ?? ''}</span>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-[#FF6F61] text-black text-xs font-semibold tracking-[0.2em] uppercase rounded-md w-max hover:bg-[#F45A4C] transition-colors"
              >
                Plan your visit
              </Link>
            </div>
          </div>
          <div className="relative min-h-[260px]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              crossOrigin="anonymous"
              alt="KLOTHS studio interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;