import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href={`${ DOMAIN }/favicon.ico`} />
          <link rel="apple-touch-icon" sizes="57x57" href={`${ DOMAIN }/apple-icon-57x57.png`} />
          <link rel="apple-touch-icon" sizes="60x60" href={`${ DOMAIN }/apple-icon-60x60.png`} />
          <link rel="apple-touch-icon" sizes="72x72" href={`${ DOMAIN }/apple-icon-72x72.png`} />
          <link rel="apple-touch-icon" sizes="76x76" href={`${ DOMAIN }/apple-icon-76x76.png`} />
          <link rel="apple-touch-icon" sizes="114x114" href={`${ DOMAIN }/apple-icon-114x114.png`} />
          <link rel="apple-touch-icon" sizes="120x120" href={`${ DOMAIN }/apple-icon-120x120.png`} />
          <link rel="apple-touch-icon" sizes="144x144" href={`${ DOMAIN }/apple-icon-144x144.png`} />
          <link rel="apple-touch-icon" sizes="152x152" href={`${ DOMAIN }/apple-icon-152x152.png`} />
          <link rel="apple-touch-icon" sizes="180x180" href={`${ DOMAIN }/apple-icon-180x180.png`} />
          <link rel="icon" type="image/png" sizes="192x192"  href={`${ DOMAIN }/android-icon-192x192.png`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${ DOMAIN }/favicon-32x32.png`} />
          <link rel="icon" type="image/png" sizes="96x96" href={`${ DOMAIN }/favicon-96x96.png`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${ DOMAIN }/favicon-16x16.png`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument