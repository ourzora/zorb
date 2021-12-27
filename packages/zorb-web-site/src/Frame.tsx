import { useState } from "react";
import { css, cx } from "@emotion/css";
import Octo from "./octo";
import Dark from "./dark";
import "@zoralabs/zorb-web-component";

const CommandBlock = ({ children }: { children: React.ReactNode }) => (
  <span
    className={css`
      border: 2px solid transparent;
      border-image-source: radial-gradient(
        75.29% 75.29% at 66.46% 24.36%,
        #e7e4fb 15.63%,
        #c2b6f6 39.58%,
        #b379f1 72.92%,
        #a639f3 90.63%,
        #b036f7 100%
      );
      border-image-slice: 1;
      border-radius: 8px;
      font-weight: 600;
    `}
  >
    <span
      className={css`
        padding: 6px 4px;
        display: inline-block;
      `}
    >
      {children}
    </span>
  </span>
);

export const Frame = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div
      className={css`
        font-family: "DM Mono";

        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: space-between;
      `}
    >
      <div
        className={css`
          padding: 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        `}
      >
        <code
          className={css`
            color: #f6f6f6;
          `}
        >
          <span
            className={css`
              opacity: 0.5;
            `}
          >
            yarn add{" "}
          </span>
          <CommandBlock>zorb</CommandBlock>
        </code>
        <form onSubmit={() => {}}>
          <input
            className={css`
              padding: 8px 22px;
              border: 2px solid #3e3e3e;
              box-sizing: border-box;
              border-radius: 999px;
              font-family: Inter, Helvetica;
              background: transparent;
              color: #f6f6f6;
            `}
            type="text"
            placeholder="Preview your Zorb"
          />
          <button
            className={css`
              color: #f6f6f6;
              opacity: 0.5;
              cursor: pointer;
              font-family: Inter;
              border: 0 none;
              background: transparent;
              margin-left: -29px;
            `}
          >
            {"→"}
          </button>
        </form>
        <a target="_BLANK" href="https://github.com/">
          <Octo />
        </a>
      </div>
      <div
        className={css`
          flex: 1;
          display: flex;
          justify-content: center;
          flex-direction: column;
        `}
      >
        <div
          className={css`
            max-height: 50vh;
            max-width: 40vw;
            margin: 0 auto;
          `}
        >
          <zora-zorb address="0x660F6D6c9BCD08b86B50e8e53B537F2B40f243Bd" />
        </div>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: flex-end;
        `}
      >
        <div
          className={css`
            font-family: Inter, Helvetica;
            font-size: 14px;
            line-height: 20px;
            color: #f6f6f6;
            max-width: 30vw;
            padding-left: 20px;
          `}
        >
          <p>
            <CommandBlock>@zoralabs/zorb</CommandBlock> is an open-source
            identity system for the decentralized Internet.
          </p>
          <p>
            It was built for Ethereum addresses but can be used with any
            arbitrary string input.{" "}
          </p>
          <p>
            It is available on <CommandBlock>npm</CommandBlock> and{" "}
            <CommandBlock>yarn</CommandBlock>.
          </p>
        </div>
        <div
          className={css`
            text-align: center;
          `}
        >
          <div>
            <a
              className={css`
                color: #fff;
              `}
              target="_blank"
              href=""
            >
              0x660F6D6c9BCD08b86B50e8e53B537F2B40f243Bd ↗
            </a>
          </div>
          <div
            className={css`
              opacity: 0.3;
            `}
          >
            fwb.eth
          </div>
        </div>
        <div className={css`
          align-self: flex-end; 
        `}>
          <a
            href="#"
            onClick={() => {
              setTheme(theme === "light" ? "dark" : "light");
            }}
          >
            <Dark />
          </a>
        </div>
      </div>
    </div>
  );
};
