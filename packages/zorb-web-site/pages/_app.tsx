import { css } from "@emotion/css";
import "inter-ui/inter.css";
import "@fontsource/dm-mono";
import { Networks, NFTFetchConfiguration } from "@zoralabs/nft-hooks";
import "inter-ui/inter.css";
import "@fontsource/dm-mono";
import { NETWORK_ID, RPC_URL } from "../src/env-vars";
import { Web3ConfigProvider } from "@zoralabs/simple-wallet-provider";
import { Web3Theme } from "../src/Web3Theme";
import { PageHeader } from "../src/PageHeader";

export default function App({ Component, pageProps }: any) {
  console.log("making app");
  return (
    <div
      className={css`
        p,
        dl {
          margin: 0;
        }
        font-family: "Inter", "system-ui";

        -webkit-font-smoothing: antialiased;

        @supports (font-variation-settings: normal) {
          font-family: "Inter var", "system-ui";
        }

        margin: 30px;
      `}
    >
      <Web3ConfigProvider
        theme={Web3Theme}
        rpcUrl={RPC_URL}
        networkId={parseInt(NETWORK_ID, 10)}
      >
        <NFTFetchConfiguration
          networkId={
            process.env.NEXT_PUBLIC_NETWORK_ID === "4"
              ? Networks.RINKEBY
              : Networks.MAINNET
          }
        >
          <PageHeader>
            <Component {...pageProps} />
          </PageHeader>
        </NFTFetchConfiguration>
      </Web3ConfigProvider>
    </div>
  );
}
