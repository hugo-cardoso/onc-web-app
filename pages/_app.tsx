import { ThemeProvider } from 'styled-components';
import { theme } from '@tunadao1/onc-components';
import { Navbar } from '../src/components/Navbar';
import { Global, Wrapper, Main, Nav } from '../src/styles/Global.styles';
import type { AppProps } from 'next/app'
import { SearchProvider } from '../src/contexts/searchContext';
import Head from 'next/head';
import Script from 'next/script'

import '@tunadao1/onc-components/dist/onc-components.css'
import { DefaultSeo, SiteLinksSearchBoxJsonLd } from 'next-seo';
import { seoConfig, siteLinkSearch } from '../src/seo.config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <DefaultSeo { ...seoConfig } />
      <SiteLinksSearchBoxJsonLd { ...siteLinkSearch } />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KSPD90VK7W"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-KSPD90VK7W');
        `}
      </Script>
      <Global />
      <SearchProvider>
        <Wrapper>
          <Navbar />
          <Main>
            <Component {...pageProps} />
          </Main>
        </Wrapper>
      </SearchProvider>
    </ThemeProvider>
  )
}

export default MyApp
