import "@zoralabs/zorb-web-component/dist/zorb-web-component.es";
import 'web-component-essentials';
import { useNFTIndexerQuery, useNFTType } from "@zoralabs/nft-hooks";
import { RoundedContainer } from "./RoundedContainer";
import { css } from "@emotion/css";
import { ZORB_CONTRACT, NETWORK_ID } from "./env-vars";

const sliceAddress = (address: string) => {
  const showChars = 4;
  const PREFIX_ADDRESS = "0x";
  const addressFirst = address.slice(0, showChars + PREFIX_ADDRESS.length);
  const addressLast = address.slice(address.length - showChars);
  return `${addressFirst}...${addressLast}`;
};

const ZorbCard = ({ result }: { result: any }) => {
  return (
    <RoundedContainer padding="5px">
      <div
        className={css`
          padding: 10px;
        `}
      >
        <zora-zorb input={result.owner.toString()}></zora-zorb>
        <zora-zorb address={'0x0djfajsdfkja'}></zora-zorb>
      </div>
      <div
        className={css`
          margin-top: 20px;

          background: rgba(30, 30, 30, 0.002);
          box-shadow: inset 0px 1px 0px rgba(246, 246, 246, 0.05);

          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          padding: 10px 10px 5px;
        `}
      >
        <div>
          <div
            className={css`
              font-family: Inter;
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 20px;

              /* identical to box height, or 167% */
              letter-spacing: 0.05em;
              text-transform: uppercase;
              font-feature-settings: "zero" on;

              color: #F6F6F6;
            `}
          >
            Zorb #{result.tokenId}
          </div>
          <a
            title="View owner on Zora"
            href={`https://${NETWORK_ID === "4" ? "rinkeby." : ""}zora.co/${
              result.owner
            }`}
            target="_blank"
            className={css`
              display: block;

              font-family: DM Mono;
              font-style: normal;
              font-weight: 500;
              font-size: 12px;
              line-height: 20px;

              text-decoration: none;

              font-feature-settings: "zero" on;

              color: #f6f6f6;

              opacity: 0.75;
            `}
          >
            {sliceAddress(result.owner)}
          </a>
        </div>
        <a
          target="_blank"
          title="View NFT on Zora"
          href={`https://${
            NETWORK_ID === "4" ? "rinkeby." : ""
          }zora.co/collections/${ZORB_CONTRACT}/${result.tokenId}`}
          className={css`
            display: block;
            font-family: Inter;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 25px;
            text-decoration: none;

            color: #f6f6f6;

            opacity: 0.5;
          `}
        >
          ↗
        </a>
      </div>
    </RoundedContainer>
  );
};

export const ZorbCards = () => {
  const { error, results } = useNFTIndexerQuery({
    collectionAddresses: [ZORB_CONTRACT],
  });

  if (error) {
    return <RoundedContainer>{error.toString()}</RoundedContainer>;
  }

  if (!results) {
    return <RoundedContainer>...</RoundedContainer>;
  }

  return (
    <div
      className={css`
        display: grid;
        grid-template-columns: auto auto auto;
        grid-gap: 30px;
      `}
    >
      {results.map((result) => (
        <ZorbCard key={result.tokenId} result={result} />
      ))}
    </div>
  );
};
