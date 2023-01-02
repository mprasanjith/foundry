import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/dist/shared/lib/utils";
import { SWRConfig } from "swr";
import type { Session } from "next-auth";
import "../styles/globals.css";
import Head from "next/head";

const MyApp: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Foundry - The elegant Markdown publishing tool</title>
        <meta name="description" content="Foundry - The elegant Markdown publishing tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SWRConfig
        value={{
          refreshInterval: 0,
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </SessionProvider>
  );
};

export default MyApp;
