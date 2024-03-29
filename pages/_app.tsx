import { ThemeProvider } from 'styled-components';
import { theme } from '@tunadao1/onc-components';
import { Navbar } from '../src/components/Navbar';
import { Global, Wrapper, Main, Nav } from '../src/styles/Global.styles';
import type { AppProps } from 'next/app'
import { SearchProvider } from '../src/contexts/searchContext';
import { ProcedureViewerProvider } from '../src/contexts/procedureViewerContext';
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
      {
        process.env.NODE_ENV === 'production' && (
          <>
            <Script 
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5349498948047909"
              strategy="afterInteractive"
              crossOrigin="anonymous"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-KSPD90VK7W');
              `}
            </Script>
            <Script id="microsoft-clarity" strategy="afterInteractive">
              {`
                (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                })(window, document, "clarity", "script", "iik2r8sxg6");
              `}
            </Script>
          </>
        )
      }
      <Global />
      <SearchProvider>
        <ProcedureViewerProvider>
          <Wrapper>
            <Navbar />
            <Main>
              <Component {...pageProps} />
            </Main>
          </Wrapper>
        </ProcedureViewerProvider>
      </SearchProvider>
    </ThemeProvider>
  )
}

export default MyApp
