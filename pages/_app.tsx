import { ThemeProvider } from 'styled-components';
import { theme } from '@tunadao1/onc-components';
import { Global } from '../src/styles/Global.styles';
import type { AppProps } from 'next/app'

import '@tunadao1/onc-components/dist/onc-components.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Global />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
