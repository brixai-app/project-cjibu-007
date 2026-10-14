import type { Product, SocialLink } from '@/types';

export type Category = 'womens' | 'mens' | 'accessories' | 'essentials';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  alignment: 'left' | 'right';
};

export type StoreDetails = {
  name: string;
  tagline: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  hours: { day: string; open: string; close: string; closed?: boolean }[];
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'hero-1',
    title: 'KLOTHS Atelier',
    subtitle: 'Spring City Study',
    description:
      'A tightly edited capsule of crisp tailoring, softened by sun-bleached neutrals and coral accents—designed for moving through the city with ease.',
    ctaLabel: 'Explore Collection',
    ctaHref: '/products',
    image:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
    alignment: 'left',
  },
  {
    id: 'hero-2',
    title: 'Night Portraits',
    subtitle: 'Textured Evening Layers',
    description:
      'Sculpted silhouettes in inky blacks and muted ivory, finished with subtle shine for late dinners and gallery openings.',
    ctaLabel: 'Shop Evening Edit',
    ctaHref: '/products?category=womens',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    alignment: 'right',
  },
  {
    id: 'hero-3',
    title: 'Off-Duty Structure',
    subtitle: 'Everyday Architecture',
    description:
      'Clean lines, generous proportions, and tactile cottons that hold their shape from studio mornings to Sunday markets.',
    ctaLabel: 'View Essentials',
    ctaHref: '/products?category=essentials',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    alignment: 'left',
  },
];

export const products: Product[] = [
  {
    id: 'p-atelier-trench',
    name: 'Atelier Belted Trench',
    slug: 'atelier-belted-trench',
    category: 'womens',
    price: 18990,
    currency: 'INR',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Stone', 'Charcoal'],
    description:
      'Longline cotton trench with exaggerated lapels, minimal hardware, and a fluid drape that layers effortlessly over tailoring or denim.',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
    ],
    featured: true,
    tags: ['outerwear', 'editorial', 'city'],
    inStock: true,
  },
  {
    id: 'p-column-dress',
    name: 'Column Slip Dress',
    slug: 'column-slip-dress',
    category: 'womens',
    price: 14990,
    currency: 'INR',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Ink', 'Pearl'],
    description:
      'Bias-cut midi dress with a clean square neckline and slender straps, cut from a matte satin that skims without clinging.',
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    ],
    featured: true,
    tags: ['evening', 'occasion'],
    inStock: true,
  },
  {
    id: 'p-soft-tailored-blazer',
    name: 'Soft Tailored Blazer',
    slug: 'soft-tailored-blazer',
    category: 'mens',
    price: 17990,
    currency: 'INR',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Ecru'],
    description:
      'Unstructured blazer in a textured wool blend with a softly padded shoulder and elongated lines for a relaxed, architectural profile.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    tags: ['tailoring', 'evening', 'studio'],
    inStock: true,
  },
  {
    id: 'p-structured-coat',
    name: 'Structured Wool Coat',
    slug: 'structured-wool-coat',
    category: 'mens',
    price: 21990,
    currency: 'INR',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Smoke'],
    description:
      'Full-length coat in double-faced wool with clean seams, hidden buttons, and a gently tapered sleeve for layered winter dressing.',
    images: [
      'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    ],
    tags: ['outerwear', 'night'],
    inStock: true,
  },
  {
    id: 'p-gallery-trouser',
    name: 'Gallery Pleat Trouser',
    slug: 'gallery-pleat-trouser',
    category: 'essentials',
    price: 8990,
    currency: 'INR',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Oat', 'Black'],
    description:
      'High-waisted trouser with a sharp front pleat, straight leg, and cropped ankle length designed for sneakers or heeled boots.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
    ],
    featured: true,
    tags: ['essentials', 'day-to-night'],
    inStock: true,
  },
  {
    id: 'p-sculpted-knit-top',
    name: 'Sculpted Knit Top',
    slug: 'sculpted-knit-top',
    category: 'essentials',
    price: 6490,
    currency: 'INR',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Bone', 'Mocha'],
    description:
      'Compact rib knit with a high funnel neck and subtle shoulder shaping, sitting neatly at the waist for clean layering.',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85',
    ],
    tags: ['knitwear', 'layering'],
    inStock: true,
  },
  {
    id: 'p-minimal-leather-tote',
    name: 'Minimal Leather Tote',
    slug: 'minimal-leather-tote',
    category: 'accessories',
    price: 12990,
    currency: 'INR',
    sizes: ['M'],
    colors: ['Black', 'Umber'],
    description:
      'Structured leather tote with slim handles, hidden magnetic closure, and a soft, unlined interior that collapses elegantly when set down.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ],
    featured: true,
    tags: ['bag', 'everyday'],
    inStock: true,
  },
  {
    id: 'p-sculpted-ankle-boot',
    name: 'Sculpted Ankle Boot',
    slug: 'sculpted-ankle-boot',
    category: 'accessories',
    price: 15990,
    currency: 'INR',
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Taupe'],
    description:
      'Soft leather ankle boot with a curved block heel and squared-off toe, engineered for all-day wear without sacrificing line.',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    ],
    tags: ['footwear', 'evening'],
    inStock: false,
  },
  {
    id: 'p-signature-shirt',
    name: 'Signature Poplin Shirt',
    slug: 'signature-poplin-shirt',
    category: 'essentials',
    price: 5990,
    currency: 'INR',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Sky'],
    description:
      'Crisp cotton shirt with an extended cuff, slightly dropped shoulder, and rounded hem for half-tucked styling.',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1400&q=85',
    ],
    tags: ['shirts', 'studio'],
    inStock: true,
  },
];

export const categories: { id: Category; label: string }[] = [
  { id: 'womens', label: 'Women' },
  { id: 'mens', label: 'Men' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'essentials', label: 'Essentials' },
];

export const storeDetails: StoreDetails = {
  name: 'KLOTHS Studio Store',
  tagline: 'Editorial garments, cut for real city movement.',
  addressLine1: '14/3, Courtyard Lane',
  addressLine2: 'Glasshouse District',
  city: 'Bengaluru',
  region: 'Karnataka',
  postalCode: '560001',
  country: 'India',
  phone: '+91 80 5555 2121',
  email: 'studio@kloths.showcase',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0188973669027!2d77.5946!3d12.9716',
  hours: [
    { day: 'Monday', open: '11:00', close: '20:00' },
    { day: 'Tuesday', open: '11:00', close: '20:00' },
    { day: 'Wednesday', open: '11:00', close: '20:00' },
    { day: 'Thursday', open: '11:00', close: '20:00' },
    { day: 'Friday', open: '11:00', close: '21:00' },
    { day: 'Saturday', open: '11:00', close: '21:00' },
    { day: 'Sunday', open: '12:00', close: '19:00' },
  ],
};

export const socialLinks: SocialLink[] = [
  {
    id: 'social-instagram',
    label: 'Instagram',
    platform: 'instagram',
    url: 'https://instagram.com',
  },
  {
    id: 'social-facebook',
    label: 'Facebook',
    platform: 'facebook',
    url: 'https://facebook.com',
  },
  {
    id: 'social-twitter',
    label: 'Twitter',
    platform: 'twitter',
    url: 'https://twitter.com',
  },
  {
    id: 'social-linkedin',
    label: 'LinkedIn',
    platform: 'linkedin',
    url: 'https://linkedin.com',
  },
  {
    id: 'social-youtube',
    label: 'YouTube',
    platform: 'youtube',
    url: 'https://youtube.com',
  },
];

export const mockData = {
  heroSlides,
  products,
  categories,
  storeDetails,
  socialLinks,
};

export default mockData;