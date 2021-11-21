// import "../styles/globals.css";
import { AppProps } from "next/app";
import { GlobalStyles } from "twin.macro";
import { Global } from "@emotion/react";

const App = ({ Component, pageProps }: AppProps) => (
  <div>
    <GlobalStyles />
    <Component {...pageProps} />
  </div>
);

export default App;
