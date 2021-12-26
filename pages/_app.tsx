import { ThemeProvider } from 'styled-components';
import { theme } from '@tunadao1/onc-components';
import { Navbar } from '../src/components/Navbar';
import { Global, Wrapper, Main, Nav } from '../src/styles/Global.styles';
import type { AppProps } from 'next/app'
import { SearchProvider } from '../src/contexts/searchContext';

import '@tunadao1/onc-components/dist/onc-components.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
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
