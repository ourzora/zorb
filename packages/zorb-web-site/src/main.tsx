import ReactDOM from "react-dom";
import { Frame } from "./Frame";
import { css } from "@emotion/css";
import { Networks, NFTFetchConfiguration } from "@zoralabs/nft-hooks";
import "inter-ui/inter.css";
import "@fontsource/dm-mono";
import { NETWORK_ID, RPC_URL } from "./env-vars";
import { Web3ConfigProvider } from "@zoralabs/simple-wallet-provider";

const SetStyles = ({ children }: any) => (
  <div
    className={css`
      font-family: "Inter", "system-ui";

      @supports (font-variation-settings: normal) {
        font-family: "Inter var", "system-ui";
      }

      margin: 30px;
    `}
  >
    {children}
  </div>
);

ReactDOM.render(
  <Web3ConfigProvider rpcUrl={RPC_URL} networkId={parseInt(NETWORK_ID, 10)}>
    <NFTFetchConfiguration
      networkId={
        process.env.NETWORK_ID === "4" ? Networks.RINKEBY : Networks.MAINNET
      }
    >
      <SetStyles>
        <Frame />
      </SetStyles>
    </NFTFetchConfiguration>
  </Web3ConfigProvider>,
  document.getElementById("main")
);
