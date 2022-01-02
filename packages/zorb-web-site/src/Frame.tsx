import { css } from "@emotion/css";
import { ZorbCards } from "./ZorbCards";
import { RoundedContainer } from "./RoundedContainer";
import { ZORB_CONTRACT } from "./env-vars";
import { MintButton } from "./MintButton";
import { NumberMinted } from "./NumberMinted";
import { format } from "date-fns";
import { END_UNIX_TIME, START_UNIX_TIME } from "./mint-status";
import { ArrowNext } from "./ArrowNext";
import DefaultZorb from './DefaultZorb';

export const Frame = ({ tokens }: any) => {
  return (
    <div
      className={css`
        @media only screen and (min-width: 800px) {
          display: flex;
          flex-direction: row-reverse;
        }
      `}
    >
      <div
        className={css`
          flex-basis: 446px;
          @media only screen and (min-width: 800px) {
            margin-top: 0;
            margin-left: 30px;
          }
        `}
      >
        <RoundedContainer>
          <p
            className={css`
              font-family: Inter;
              font-style: normal;
              font-weight: normal;
              font-size: 16px;
              line-height: 25px;

              /* or 156% */

              color: #ffffff;

              opacity: 0.75;

              sup {
                opacity: 0.5;
              }
            `}
          >
            In celebration of the one-year anniversary of the Zora protocol and
            the initial release of{" "}
            <code
              className={css`
                font-family: "DM Mono";
              `}
            >
              zorb
            </code>
            , we invite you to mint a commemorative NFT for your collection.
            Minting is open for{" "}
            <code
              className={css`
                font-family: "DM Mono";
              `}
            >
              20+22
            </code>{" "}
            hours on New Years Day and cements your status as an early supporter
            of Zora.
          </p>
          <MintButton />
        </RoundedContainer>
        <div
          className={css`
            height: 30px;
          `}
        >
          &nbsp;
        </div>
        <RoundedContainer>
          <dl
            className={css`
              display: flex;
              flex-flow: row wrap;

              dt {
                flex-basis: 20%;

                text-transform: uppercase;

                font-family: Inter;
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 20px;

                white-space: nowrap;

                /* identical to box height, or 167% */
                letter-spacing: 0.05em;
                text-transform: uppercase;

                color: #ffffff;

                opacity: 0.5;
                padding-right: 10px;
              }

              dd {
                flex-basis: 74%;
                flex-grow: 1;
                margin-left: 0;

                font-family: DM Mono;
                font-style: normal;
                font-weight: 500;
                font-size: 12px;
                line-height: 20px;

                /* identical to box height, or 167% */
                font-feature-settings: "zero" on;

                color: #f6f6f6;

                opacity: 0.75;
              }
            `}
          >
            <dt>contract</dt>
            <dd>
              <a
                target="_blank"
                className={css`
                  text-decoration: none;
                  color: white;
                  white-space: pre;
                  @media only screen and (max-width: 400px) {
                    font-size: 10px;
                  }
                `}
                href={`http://etherscan.io/address/${ZORB_CONTRACT}`}
              >
                {ZORB_CONTRACT}
                <ArrowNext />
              </a>
            </dd>
            <dt>№ minted</dt>
            <dd>
              <NumberMinted />
            </dd>
            <dt>price</dt>
            <dd>Free. Just pay gas.</dd>
            <dt>starts</dt>
            <dd>
              {format(
                new Date(START_UNIX_TIME * 1000),
                "MMM dd yyyy, HH:mm zzz"
              )}
            </dd>
            {/* <dd>Jan 1<sup>st</sup> 2022, 0:00 EST</dd> */}
            <dt>ends</dt>
            <dd>
              {format(new Date(END_UNIX_TIME * 1000), "MMM dd yyyy, HH:mm zzz")}
            </dd>
            {/* <dd>Jan 2<sup>nd</sup> 2022, 20:00 EST</dd> */}
          </dl>
        </RoundedContainer>
      </div>

      {tokens.length ? (
        <div
          className={css`
            flex: 1;
            flex-grow: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-self: flex-start;


            @media only screen and (max-width: 800px) {
              margin-top: 30px;
            }
          `}
        >
          <ZorbCards tokens={tokens} />
        </div>
      ) : (
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          `}
        >
          <div className={css`padding-top:100px`}>
            <DefaultZorb />
            <div
              className={css`
                font-family: Inter;
                font-style: normal;
                font-weight: normal;
                font-size: 16px;
                line-height: 25px;
                margin-top: 58px;

                /* identical to box height, or 156% */

                color: #ffffff;
              `}
            >
              Nothing minted...yet.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
