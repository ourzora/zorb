import { css } from "@emotion/css";
import {
  ModalActionLayout,
  useWalletButton,
  useWalletModalState,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TimeLeft } from "./TimeLeft";
import { ethers } from "ethers";
import { ZORB_CONTRACT } from "./env-vars";

// The ERC-20 Contract ABI, which is a common contract interface
// for tokens (this is the Human-Readable ABI format)
const ZORB_API = [
  "function mint()",
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

const MintModalContent = ({setError}: any) => {
  const { active, library } = useWeb3Wallet();
  const contract = useMemo(() => {
    // The Contract object
    return new ethers.Contract(ZORB_CONTRACT, ZORB_API, library);
  }, [library]);

  const doMint = useCallback(async () => {
    try {
      await contract.connect(await library.getSigner()).mint();
    } catch (e) {
      if (e?.error?.message) {
        setError(e.error.message);
      } else {
        setError(e.message || e.toString());
      }
    }
  }, [contract]);

  useEffect(() => {
    if (active) {
      doMint();
    }
  }, [active]);

  return (
    <div
      className={css`
        padding: 10px;
      `}
    >
      <p>We sent a request to mint your Zorb onto the Ethereum blockchain.</p>
      <p>Approve the request in your wallet to continue.</p>
      <p>Gas fees apply when minting.</p>
    </div>
  );
};

export const MintButton = ({}) => {
  const { active, account, deactivate } = useWeb3Wallet();
  const { openModal } = useWalletButton();
  const { openModalByName } = useWalletModalState();
  const lastActive = useRef<any>();
  const [error, setError] = useState();

  useEffect(() => {
    lastActive.current = active;
  }, [active, lastActive]);
  useEffect(() => {
    if (active) {
      deactivate();
    }
  }, []);

  const mint = useCallback(async () => {
    console.log({ active, account });
    if (active) {
      openModalByName("mintModal");
    } else {
      openModal();
    }
  }, [active, openModal, openModalByName]);

  return (
    <>
      <ModalActionLayout
        modalName="mintModal"
        modalTitle="Mint your Zorb"
        modalDescription="Mint your Zorb"
        error={error}
      >
        <MintModalContent setError={setError} />
      </ModalActionLayout>
      <div
        className={css`
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

            padding: 17px 31px;
            border: 0;
            cursor: pointer;
          `}
        >
          Mint now
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
