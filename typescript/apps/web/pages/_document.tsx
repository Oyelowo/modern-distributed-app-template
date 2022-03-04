import { extractCritical } from "@emotion/server";
import { Fragment } from "react";
import DocumentDefault, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

export default function Document() {
  // async function getInitialProps(ctx: DocumentContext) {
  //   const initialProps = await DocumentDefault.getInitialProps(ctx);
  //   const critical = extractCritical(initialProps.html);
  //   initialProps.html = critical.html;
  //   initialProps.styles = (
  //     <Fragment>
  //       {initialProps.styles}
  //       <style
  //         data-emotion-css={critical.ids.join(" ")}
  //         dangerouslySetInnerHTML={{ __html: critical.css }}
  //       />
  //     </Fragment>
  //   );

  //   return initialProps;
  // }

  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
