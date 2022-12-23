import { type AppType } from "next/dist/shared/lib/utils";
import { SWRConfig } from "swr";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
};

export default MyApp;
