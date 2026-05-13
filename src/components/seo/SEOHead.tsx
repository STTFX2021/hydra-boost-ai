import { Helmet } from 'react-helmet-async';
import { useLocalizedSEO } from './useLocalizedSEO';

interface SEOHeadProps {
  title: string;
  description: string;
  /** Path-only canonical (e.g. "/precios"). Will be merged with current language. */
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noindex?: boolean;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const BASE_URL = 'https://hydrailabs.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

export const SEOHead = ({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  keywords,
  author = 'HydrAI Labs',
  publishedTime,
  modifiedTime,
}: SEOHeadProps) => {
  const fullTitle = title.includes('HydrAI Labs') ? title : `${title} | HydrAI Labs`;
  const seo = useLocalizedSEO(canonical);

  return (
    <Helmet>
      {/* Dynamic <html lang> per active language */}
      <html lang={seo.language} />

      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
        }
      />

      {/* Canonical for the current language */}
      <link rel="canonical" href={seo.canonical} />

      {/* hreflang alternates — tell Google the same content in other languages */}
      {seo.alternates.map((alt) => (
        <link key={alt.hreflang} rel="alternate" hrefLang={alt.hreflang} href={alt.href} />
      ))}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="HydrAI Labs" />
      <meta property="og:locale" content={seo.ogLocale} />
      {seo.ogLocaleAlternates.map((loc) => (
        <meta key={loc} property="og:locale:alternate" content={loc} />
      ))}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seo.canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Article-specific meta */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
    </Helmet>
  );
};
