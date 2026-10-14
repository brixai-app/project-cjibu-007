import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ShoppingBag, Instagram, Facebook, Twitter, Linkedin, Youtube, Github } from 'lucide-react';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';
import Home from '@/pages/Home';
import ShopPage from '@/pages/ShopPage';
import { storeDetails, socialLinks } from '@/data/mockData';

function ContactPage() {
  const mapUrl = storeDetails?.mapEmbedUrl ?? '';
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#2B2B2B]">
      <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <section className="grid gap-10 lg:grid-cols-[2fr,3fr]">
          <div>
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl tracking-tight mb-4">
              Visit KLOTHS
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-[#6B7280] mb-8">
              Appointment-forward boutique experience
            </p>
            <div className="space-y-4 text-sm leading-relaxed">
              <p>{storeDetails?.tagline ?? ''}</p>
              <div>
                <p>{storeDetails?.addressLine1 ?? ''}</p>
                <p>{storeDetails?.addressLine2 ?? ''}</p>
                <p>
                  {storeDetails?.city ?? ''}, {storeDetails?.region ?? ''}{' '}
                  {storeDetails?.postalCode ?? ''}
                </p>
                <p>{storeDetails?.country ?? ''}</p>
              </div>
              <div>
                <p>Phone: {storeDetails?.phone ?? ''}</p>
                <p>Email: {storeDetails?.email ?? ''}</p>
              </div>
              <div>
                <p className="font-medium mb-1">Store Hours</p>
                <ul className="space-y-1 text-xs text-[#6B7280]">
                  {storeDetails?.hours?.map((h) => (
                    <li key={h?.day ?? ''}>
                      <span className="inline-block w-20">{h?.day ?? ''}</span>
                      {h?.closed
                        ? 'Closed'
                        : `${h?.open ?? ''} – ${h?.close ?? ''}`}
                    </li>
                  )) ?? null}
                </ul>
              </div>
            </div>
          </div>
          <div className="h-[340px] md:h-[420px] overflow-hidden rounded-[16px] border border-[#E4E4E7] bg-white">
            {mapUrl ? (
              <iframe
                title="KLOTHS Store Map"
                src={mapUrl}
                className="h-full w-full"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-[#6B7280]">
                Map unavailable
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] text-[#2B2B2B]">
      <div className="mx-auto max-w-4xl px-4 py-12 lg:py-16 space-y-6">
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl tracking-tight">
          About KLOTHS
        </h1>
        <p className="text-sm uppercase tracking-[0.2em] text-[#6B7280]">
          Offline-first, meticulously curated
        </p>
        <p className="text-sm leading-relaxed">
          KLOTHS Showcase is a boutique fashion destination centered on tactile
          discovery. Every silhouette, fabric, and detail is hand-selected to
          feel considered, architectural, and quietly confident.
        </p>
        <p className="text-sm leading-relaxed">
          This digital showcase is designed to inspire your next in-store visit:
          an image-led lookbook, an expressive gallery, and just enough detail
          to let you imagine each piece in motion before you try it on IRL.
        </p>
      </div>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-center px-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-[#6B7280] mb-2">
          404
        </p>
        <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl mb-4">
          Page not stitched yet
        </h1>
        <Link
          to="/"
          className="inline-flex items-center border border-[#2B2B2B] px-5 py-2 text-xs tracking-[0.2em] uppercase bg-white hover:bg-[#FF6F61] hover:text-black transition-colors"
        >
          Return home
        </Link>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#FAFAFA]/95 backdrop-blur border-b border-[#E4E4E7]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="font-['Playfair_Display'] text-xl tracking-tight">
          KLOTHS
        </Link>
        <nav className="flex items-center gap-6 text-xs uppercase tracking-[0.2em]">
          <Link to="/products" className="hover:text-[#FF6F61]">
            Shop
          </Link>
          <Link to="/about" className="hover:text-[#FF6F61] hidden sm:inline">
            About
          </Link>
          <Link to="/contact" className="hover:text-[#FF6F61] hidden sm:inline">
            Visit
          </Link>
          <CartDrawer triggerClassName="relative inline-flex items-center justify-center border border-[#2B2B2B] px-3 py-1 hover:bg-[#FF6F61] hover:text-black transition-colors">
            <ShoppingBag className="h-4 w-4" />
          </CartDrawer>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const platformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-4 w-4" />;
      case 'facebook':
        return <Facebook className="h-4 w-4" />;
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      case 'github':
        return <Github className="h-4 w-4" />;
      default:
        return null;
    }
  };
  return (
    <footer className="border-t border-[#E4E4E7] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-['Playfair_Display'] text-lg">KLOTHS Showcase</p>
          <p className="text-xs text-[#6B7280]">
            Image-led, offline-first boutique experience.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks?.map((link) => (
            <a
              key={link?.id ?? ''}
              href={link?.url ?? '#'}
              target="_blank"
              rel="noreferrer"
              className="text-[#6B7280] hover:text-[#FF6F61]"
            >
              {platformIcon(link?.platform ?? '')}
            </a>
          )) ?? null}
        </div>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <CartProvider>
      <HashRouter>
        <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-[#2B2B2B]">
          <Header />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ShopPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </HashRouter>
      <Toaster position="top-right" richColors />
    </CartProvider>
  );
}

export default App;