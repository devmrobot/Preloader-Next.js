import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Preloader from "../components/preloader/Preloader";
import CursorProvider from "../context/CursorContext";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <CursorProvider>
      <Preloader>
        <Component {...pageProps} key={router.route} />
      </Preloader>
    </CursorProvider>
  );
}

export default MyApp;
