import { extractCss } from "goober";
import DocumentDefault, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default function Document(props: Awaited<ReturnType<typeof getInitialProps>>) {
  return (
    <Html>
      <Head>
        <style
          id={"_goober"}
          // And defined it in here
          dangerouslySetInnerHTML={{ __html: " " + props.css }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

async function getInitialProps(ctx: DocumentContext) {
  const initialProps = await DocumentDefault.getInitialProps(ctx);
  const page = await ctx.renderPage();
  // Extrach the css for each page render
  const css = extractCss();

  return { ...initialProps, ...page, css };
}
