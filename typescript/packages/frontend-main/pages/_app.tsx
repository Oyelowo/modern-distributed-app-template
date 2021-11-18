import { AppProps } from "next/app";
import "../styles/globals.css";
import { GlobalStyles } from "twin.macro";

const App = ({ Component, pageProps }: AppProps) => (
  <div>
    <GlobalStyles />
    <Component {...pageProps} />
  </div>
);

export default App;
