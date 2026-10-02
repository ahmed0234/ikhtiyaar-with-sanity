// ── Site Settings (Navbar & Global) ─────────────────────────────────────────

export type SanityNavLink = {
  _key?: string;
  label: string;
  href: string;
};

export type SanitySettings = {
  _id?: string;
  _type?: string;
  topbarLeft?: string;
  topbarRight?: string;
  logoAlt?: string;
  logoImage?: {
    asset?: {
      _id: string;
      url: string;
    };
    alt?: string;
    hotspot?: unknown;
    crop?: unknown;
  };
  logoUrl?: string;
  serviceLinks?: SanityNavLink[];
  navLinks?: SanityNavLink[];
  phoneDisplay?: string;
  phoneTel?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

// ── Blog Posts ───────────────────────────────────────────────────────────────

export type SanityBlogPostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: {
    alt?: string;
    caption?: string;
    asset?: unknown;
  };
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  categories?: string[];
  tags?: string[];
  estimatedReadingTime?: number;
};

export type SanityBlogPostDetail = SanityBlogPostCard & {
  content?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: {
    asset?: unknown;
  };
};
