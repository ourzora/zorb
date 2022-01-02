import { useNFTIndexerQuery, useNFTType } from "@zoralabs/nft-hooks";
import { RoundedContainer } from "./RoundedContainer";
import { css } from "@emotion/css";
import { ZORB_CONTRACT, NETWORK_ID } from "./env-vars";
import { AddressView } from "./AddressView";
import { gradientForAddress } from "./gradient-lib";

const ZorbCard = ({ result }: { result: any }) => {
  const gradientColors = gradientForAddress(result.owner);
  return (
    <RoundedContainer
      className={css`
        &:hover {
          background: linear-gradient(
              0deg,
              rgba(30, 30, 30, 0.93) 0%,
              rgba(30, 30, 30, 0.93) 100%
            ),
            linear-gradient(
              202.92deg,
              ${gradientColors[0]} 22.55%,
              ${gradientColors[1]} 43.12%,
              ${gradientColors[2]} 71.73%,
              ${gradientColors[3]} 86.93%,
              ${gradientColors[4]} 94.98%
            );
        }
      `}
      padding="5px"
    >
      <a
        href={`/nft/${result.tokenId}`}
        target="_blank"
        title="View on Zora"
        className={css``}
      >
        <img
          className={css`
            width: 100px;
            height: 100px;
            display: block;
            margin: 35px auto 40px;
          `}
          src={result.metadata.json.image}
        />
      </a>
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

              color: #f6f6f6;
            `}
          >
            {result.metadata.json.name}
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
            <AddressView address={result.owner} />
          </a>
        </div>
        <a
          target="_blank"
          title="View NFT on Zora"
          href={`/nft/${result.tokenId}`}
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

export const ZorbCards = ({ tokens }) => {
  const { error, results } = useNFTIndexerQuery(
    {
      collectionAddresses: [ZORB_CONTRACT],
    },
    { initialData: tokens }
  );

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
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 30px;

        @media only screen and (min-width: 375px) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media only screen and (min-width: 1280px) {
          grid-template-columns: repeat(4, 1fr);
        }
      `}
    >
      {results
        .map((r: any) => r.nft.tokenData)
        .filter((r) => r.metadata?.json)
        .reverse()
        .map((result) => (
          <ZorbCard key={result.tokenId} result={result} />
        ))}
    </div>
  );
};
