import { createGetInitialProps, ServerStyles, createStylesServer } from '@mantine/next';
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

// const getInitialProps = createGetInitialProps();
const stylesServer = createStylesServer();

export default class _Document extends Document {
//   static getInitialProps = getInitialProps;
   static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    // Add your app specific logic here

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
      ],
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
