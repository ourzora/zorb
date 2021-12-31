import { GetServerSideProps } from "next";
import { useNFT } from "@zoralabs/nft-hooks";
import { NETWORK_ID, ZORB_CONTRACT } from "../../src/env-vars";
import { IndexerDataType } from "@zoralabs/nft-hooks/dist/fetcher/AuctionInfoTypes";
import { css } from "@emotion/css";
import Head from "../../src/Head";
import { RoundedContainer } from "../../src/RoundedContainer";
import { ArrowNext } from "../../src/ArrowNext";
import { getTokenInfo } from "../../src/get-query-contract";

export default function Zorb({ id, tokenInfo }: any) {
  // const { data, error } = useNFT(ZORB_CONTRACT, id, { useBetaIndexer: true });

  // const indexerData = data as IndexerDataType;

  if (!tokenInfo) {
    return (
      <RoundedContainer>
        <div
          className={css`
            font-family: Inter;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 32px;
            color: #f7f7f7;
          `}
        >Zorb being indexed or hasn't been minted yet.</div>
      </RoundedContainer>
    );
  }

  const image = tokenInfo.zorbImage;

  return (
    <>
      <Head title="View your Zorb" description="" ogImage={image} />
      <div
        className={css`
          display: flex;
          flex-direction: column;
          min-height: 80vh;
        `}
      >
        <div
          className={css`
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <img
            src={image}
            alt="Zorb"
            className={css`
              width: 300px;
              height: 300px;
            `}
          />
        </div>
        <div
          className={css`
            flex-grow: 1;
          `}
        >
          &nbps;
        </div>
        <RoundedContainer>
          <div
            className={css`
              color: #f6f6f6;
              .dark {
                opacity: 0.5;
              }
              .link-first {
                margin-top: 14px;
              }
              font-family: DM Mono;
              font-style: normal;
              font-weight: 500;
              font-size: 16px;
              line-height: 32px;

              /* identical to box height, or 200% */
              font-feature-settings: "zero" on;

              a {
                text-decoration: none;
                color: inherit;
              }
            `}
          >
            <div>{indexerData.zoraIndexerResponse.metadata.json.name}</div>
            <div className="dark">{indexerData.nft.owner}</div>
            <div className="link-first">
              <a
                href={`https://${
                  NETWORK_ID === "4" ? "rinkeby." : ""
                }etherscan.io/token/${ZORB_CONTRACT}?a=${id}`}
                target="_blank"
              >
                View on Etherscan <ArrowNext />
              </a>
            </div>
            <div>
              <a
                href={`https://${
                  NETWORK_ID === "4" ? "rinkeby." : ""
                }zora.co/collections/${ZORB_CONTRACT}/${id}`}
                target="_blank"
              >
                View on ZORA <ArrowNext />
              </a>
            </div>
          </div>
        </RoundedContainer>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  let tokenInfo = undefined;
  try {
    tokenInfo = getTokenInfo(params.id as string)
  } catch (e) {
    console.error(e);
    // couldnt get token info
  }
  return {
    props: {
      id: params.id,
      tokenInfo,
    },
  };
};
