import ReactDOM from "react-dom";
import { Frame } from "./Frame";
import { css } from "@emotion/css";
import { Networks, NFTFetchConfiguration } from "@zoralabs/nft-hooks";
import "inter-ui/inter.css";
import "@fontsource/dm-mono";

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
  <NFTFetchConfiguration
    networkId={
      process.env.NETWORK_ID === "4" ? Networks.RINKEBY : Networks.MAINNET
    }
  >
    <SetStyles>
      <Frame />
    </SetStyles>
  </NFTFetchConfiguration>,
  document.getElementById("main")
);
