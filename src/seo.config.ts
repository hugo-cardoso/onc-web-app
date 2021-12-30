import { DefaultSeoProps, SiteLinksSearchBoxJsonLdProps } from 'next-seo';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

export const seoConfig = {
  title: 'Open Nav Charts',
  description: 'Open Nav Charts is a free online aviation chart viewer for use in flight simulation.',
  canonical: DOMAIN,
  openGraph: {
    type: 'website',
    title: 'Open Nav Charts',
    description: 'Open Nav Charts is a free online aviation chart viewer for use in flight simulation.',
    url: DOMAIN,
    images: [
      {
        url: `${DOMAIN}/og_image.png`,
        width: 1200,
        height: 627,
        type: 'image/png',
      }
    ],
  },
  facebook: {
    appId: '610657423380802',
  }
} as DefaultSeoProps;

export const siteLinkSearch = {
  url: DOMAIN,
  potentialActions: [
    {
      target: `${DOMAIN}/app/search?icao`,
      queryInput: 'search_term_string',
    }
  ]
} as SiteLinksSearchBoxJsonLdProps;