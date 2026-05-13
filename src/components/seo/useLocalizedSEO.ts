import { useLocation } from 'react-router-dom';
import {
  HREFLANG_MAP,
  OG_LOCALE_MAP,
  SUPPORTED_LANGUAGES,
  useI18n,
  type Language,
} from '@/lib/i18n';

const BASE_URL = 'https://hydrailabs.com';

export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

export interface LocalizedSEO {
  /** Current active language */
  language: Language;
  /** og:locale value, e.g. "es_ES" */
  ogLocale: string;
  /** Alternate og:locale values for the other supported languages */
  ogLocaleAlternates: string[];
  /** Canonical URL for the current language (with ?lang= when not default) */
  canonical: string;
  /** Full set of hreflang alternates for <link rel="alternate"> */
  alternates: HreflangAlternate[];
}

/**
 * Returns SEO data for the current route in the active language.
 *
 * Strategy (Fase 1 — pre-routing-refactor):
 * - Default language (es) keeps the clean canonical URL already indexed by Google.
 * - Other languages are exposed as `?lang=xx` alternates. The i18n store reads
 *   that query param on init so the page actually renders in that language when
 *   crawled by Googlebot.
 * - Once Fase 3 lands (route prefixes /en/, /fr/, ...), this hook is the single
 *   place to swap the URL builder.
 */
export const useLocalizedSEO = (overridePath?: string): LocalizedSEO => {
  const { language } = useI18n();
  const location = useLocation();
  const path = overridePath ?? location.pathname;

  const buildUrl = (lang: Language) =>
    lang === 'es' ? `${BASE_URL}${path}` : `${BASE_URL}${path}?lang=${lang}`;

  const alternates: HreflangAlternate[] = SUPPORTED_LANGUAGES.map((lang) => ({
    hreflang: HREFLANG_MAP[lang],
    href: buildUrl(lang),
  }));

  // x-default points to the canonical Spanish version
  alternates.push({ hreflang: 'x-default', href: `${BASE_URL}${path}` });

  return {
    language,
    ogLocale: OG_LOCALE_MAP[language],
    ogLocaleAlternates: SUPPORTED_LANGUAGES
      .filter((l) => l !== language)
      .map((l) => OG_LOCALE_MAP[l]),
    canonical: buildUrl(language),
    alternates,
  };
};
