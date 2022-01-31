import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
import { ServerStyleSheets } from '@mui/styles'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }

  render(): JSX.Element {
    return (
      <Html lang={'en'}>
        <Head>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
