export enum Category {
  Womens = 'WOMENS',
  Mens = 'MENS',
  Accessories = 'ACCESSORIES',
  Footwear = 'FOOTWEAR',
  Editorial = 'EDITORIAL',
}

export enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  OneSize = 'ONE_SIZE',
}

export type Product = {
  id: string;
  name: string;
  slug: string;
  category: Category;
  price: number;
  currency: string;
  sizes: Size[];
  colors: string[];
  description: string;
  images: string[];
  featured?: boolean;
  tags?: string[];
  inStock: boolean;
};

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  currency: string;
  size: Size;
  color?: string;
  quantity: number;
  image: string;
};

export type SocialPlatform =
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'youtube'
  | 'github';

export type SocialLink = {
  id: string;
  label: string;
  platform: SocialPlatform;
  url: string;
};

export type ContactFormSubmission = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  preferredVisitDate?: string;
  createdAt: string;
};

export type NewsletterSignup = {
  id: string;
  email: string;
  createdAt: string;
  source?: 'footer' | 'hero' | 'modal' | 'other';
};

const types = {
  Category,
  Size,
};

export default types;