import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../Components/Header/Header";
import QueryContextProvider from "../Services/MovieContext";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryContextProvider>
      <Header />
      <Component {...pageProps} />
    </QueryContextProvider>
  );
}

export default MyApp;
