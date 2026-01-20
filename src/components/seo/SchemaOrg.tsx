import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://hydrailabs.com';

// Organization Schema - used site-wide
export const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HydrAI Labs',
    url: BASE_URL,
    logo: `${BASE_URL}/favicon.png`,
    description: 'Agencia de Inteligencia Artificial para negocios locales: webs, chatbots 24/7 y automatizaciones que captan clientes mientras duermes.',
    email: 'hola@hydrailabs.com',
    sameAs: [
      'https://discord.gg/KrymATqa',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// LocalBusiness Schema - for service pages
export const LocalBusinessSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#localbusiness`,
    name: 'HydrAI Labs',
    image: `${BASE_URL}/og-image.png`,
    url: BASE_URL,
    telephone: '',
    email: 'hola@hydrailabs.com',
    description: 'Agencia de automatización con IA para negocios locales. Creamos webs, chatbots y automatizaciones.',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ES',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// Service Schema
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  price?: string;
  priceCurrency?: string;
}

export const ServiceSchema = ({ name, description, url, price, priceCurrency = 'EUR' }: ServiceSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${BASE_URL}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'HydrAI Labs',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'España',
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency,
      },
    }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  items: FAQItem[];
}

export const FAQSchema = ({ items }: FAQSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// BreadcrumbList Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

// WebPage Schema
interface WebPageSchemaProps {
  name: string;
  description: string;
  url: string;
}

export const WebPageSchema = ({ name, description, url }: WebPageSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${BASE_URL}${url}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'HydrAI Labs',
      url: BASE_URL,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
