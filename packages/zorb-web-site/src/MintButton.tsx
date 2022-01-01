import { css } from "@emotion/css";
import {
  ModalActionLayout,
  useWalletButton,
  useWalletModalState,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TimeLeft } from "./TimeLeft";
import { BigNumber, ethers } from "ethers";
import { NETWORK_ID, ZORB_CONTRACT } from "./env-vars";
import { getStatus, Status } from "./mint-status";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const ZORB_API = [
  "function adminMint(address to)",
  "function mint()",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const MintModalContent = ({ setError, setMintId }: any) => {
  const { active, account, library } = useWeb3Wallet();
  const { openModalByName } = useWalletModalState();
  const contract = useMemo(() => {
    // The Contract object
    return new ethers.Contract(ZORB_CONTRACT, ZORB_API, library);
  }, [library]);

  const doMint = useCallback(async () => {
    try {
      const minting = await contract.connect(await library.getSigner()).mint();
      contract.on(
        "Transfer",
        (from: string, to: string, tokenId: BigNumber) => {
          if (from === ethers.constants.AddressZero && to === account) {
            setMintId(tokenId.toNumber().toString());
          }
        }
      );
      await minting.wait();
      openModalByName("success");
    } catch (e) {
      if (e?.error?.message) {
        setError(e.error.message);
        openModalByName("errorModal");
      } else {
        setError(e.message || e.toString());
        openModalByName("errorModal");
      }
    }
  }, [contract, openModalByName]);

  useEffect(() => {
    if (active) {
      doMint();
    }
  }, [active]);

  return (
    <div
      className={css`
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 25px;

        p {
          text-align: left;
        }

        /* or 156% */

        color: #999999;

        width: 320px;
      `}
    >
      <p>
        We sent a request to mint your Zorb onto the Ethereum blockchain.
        Approve the request in your wallet to continue.
      </p>
      <p>Gas fees apply when minting.</p>
    </div>
  );
};

export const MintButton = ({}) => {
  const { active, account, deactivate } = useWeb3Wallet();
  const { openModal } = useWalletButton();
  const { openModalByName, closeModal } = useWalletModalState();
  const lastActive = useRef<any>();
  const [error, setError] = useState();
  const [mintId, setMintId] = useState<string | undefined>();

  const [yourZorb, setYourZorb] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (account) {
      fetch(
        `https://rinkeby.ether.actor/0xd70E10Cff7450BEfC708eDb47E14eA5D47a9186C/zorbForAddress/${account}`
      )
        .then((r) => r.text())
        .then((data) => {
          setYourZorb(data);
        });
    }
  }, [account]);

  useEffect(() => {
    if (!lastActive.current && active) {
      mint();
    }
    lastActive.current = active;
  }, [active, lastActive]);
  useEffect(() => {
    // attempt deactivate
    console.log(active);
    if (active) {
      deactivate();
    }
  }, []);

  const mint = useCallback(async () => {
    if (active) {
      openModalByName("mintModal");
    } else {
      openModal();
    }
  }, [active, openModal, openModalByName]);

  const mintStatus = getStatus();

  return (
    <>
      <ModalActionLayout
        modalName="success"
        modalTitle="It’s yours"
        modalDescription=""
      >
        <div
          className={css`
            width: 100%;
            height: 200px;
            background: linear-gradient(
              202.92deg,
              rgba(237, 252, 248, 0.2) 22.55%,
              rgba(134, 238, 211, 0.2) 43.12%,
              rgba(25, 128, 225, 0.2) 71.73%,
              rgba(18, 89, 181, 0.2) 86.93%,
              rgba(18, 89, 181, 0.2) 94.98%
            );
            border-radius: 4px;
            text-align: center;
          `}
        >
          <img
            className={css`
              width: 140px;
              height: 140px;
              margin-top: 22px;
            `}
            src={yourZorb}
            alt="Your Zorb"
          />
        </div>
        <p
          className={css`
            font-family: Inter;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 25px;

            /* or 156% */

            color: #999999;
          `}
        >
          Thank you for being part of Zora’s first year. May we ponder on this
          zorb together for many more years to come.
        </p>
        <button
          onClick={() => {
            window.location.href = `/nft/${mintId}`;
          }}
          className={css`
            background: #333333;
            cursor: pointer;
            border-radius: 4px;
            padding: 17.5px 10px;
            width: 100%;
            color: #fff;
            font-family: Inter;
            text-align: center;
            font-style: normal;
            font-weight: 600;
            border: 0;
            font-size: 16px;
            line-height: 25px;
          `}
        >
          View my NFT
        </button>
      </ModalActionLayout>
      <ModalActionLayout
        modalName="errorModal"
        modalTitle="Minting failed"
        modalDescription="Error message for minting"
      >
        <p
          className={css`
            font-family: Inter;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 25px;

            /* or 156% */

            color: #999999;
          `}
        >
          An error occurred from the blockchain: {error}
        </p>
        <button
          onClick={mint}
          className={css`
            background: #333333;
            cursor: pointer;
            border-radius: 4px;
            padding: 17.5px 10px;
            width: 100%;
            color: #fff;
            font-family: Inter;
            text-align: center;
            font-style: normal;
            font-weight: 600;
            border: 0;
            font-size: 16px;
            line-height: 25px;
          `}
        >
          Retry
        </button>
      </ModalActionLayout>
      <ModalActionLayout
        modalName="mintModal"
        modalTitle="Approve minting request"
        modalDescription="Mint your Zorb"
      >
        <MintModalContent setMintId={setMintId} setError={setError} />
      </ModalActionLayout>
      <div
        className={css`
          margin-top: 20px;
          display: flex;
          align-items: center;
        `}
      >
        <button
          onClick={mint}
          className={css`
            background: #f6f6f6;
            border-radius: 4px;

            font-family: Inter;
            font-style: normal;
            font-weight: 600;
            font-size: 16px;
            line-height: 25px;
            color: #000;

            white-space: nowrap;

            padding: 17px 31px;
            border: 0;
            cursor: pointer;

            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }
          `}
          disabled={NETWORK_ID === "1" && mintStatus !== Status.OPEN}
        >
          {mintStatus === Status.NOT_STARTED && "Mint soon"}
          {mintStatus === Status.FINISHED && "Mint over"}
          {mintStatus === Status.OPEN && "Mint now"}
        </button>
        <div
          className={css`
            margin-left: 25px;
            font-family: Inter;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 25px;

            /* identical to box height, or 156% */

            color: #f6f6f6;

            opacity: 0.5;
          `}
        >
          <TimeLeft />
        </div>
      </div>
    </>
  );
};
