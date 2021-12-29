import { ThemeProvider } from 'styled-components';
import { theme } from '@tunadao1/onc-components';
import { Navbar } from '../src/components/Navbar';
import { Global, Wrapper, Main, Nav } from '../src/styles/Global.styles';
import type { AppProps } from 'next/app'
import { SearchProvider } from '../src/contexts/searchContext';
import Head from 'next/head';
import Script from 'next/script'

import '@tunadao1/onc-components/dist/onc-components.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Open Nav Charts</title>
        <meta name="description" content="Open Nav Charts is a free online aviation chart viewer for use in flight simulation." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Open Nav Charts" />
        <meta property="og:site_name" content="Open Nav Charts" />
        <meta property="og:description" content="Open Nav Charts is a free online aviation chart viewer for use in flight simulation." />
        <meta property="og:image" content="/og_image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <link rel="icon" href="/favicon.ico" />
        <script data-ad-client="ca-pub-5349498948047909" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
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
