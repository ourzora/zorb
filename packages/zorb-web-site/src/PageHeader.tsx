import { css } from "@emotion/css";
import React from "react";
import DiscordLogo from "./DiscordLogo";
import Octo from "./octo";

export const PageHeader = ({ children }: { children: React.ReactNode }) => (
  <div
    className={css`
      font-family: "DM Mono";

      display: flex;
      flex-direction: column;
    `}
  >
    <div
      className={css`
        padding: 0px 10px;
        display: flex;

        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-bottom: 20px;
      `}
    >
      <a
        href="/"
        className={css`
          color: #f6f6f6;

          text-decoration: none;

          font-family: DM Mono;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 21px;

          /* identical to box height */
          letter-spacing: -0.02em;

          opacity: 0.5;
        `}
      >
        <span
          className={css`
            opacity: 0.5;
          `}
        >
          npm i{" "}
        </span>
        <span>@zoralabs/zorb</span>
        {/*on-chain <span>zorb</span>*/}
      </a>
      <div
        className={css`
          display: flex;
          align-items: center;

          a {
            opacity: 0.7;
            transition: opacity 0.4s ease-in;
          }
          a:hover {
            opacity: 1;
          }
        `}
      >
        <a target="_blank" href="https://github.com/ourzora/zorb">
          <Octo />
        </a>
        <a
          className={css`
            display: inline-block;
            margin-bottom: -4px;
            margin-left: 16px;
          `}
          target="_blank"
          href="https://zora.community"
        >
          <DiscordLogo />
        </a>
      </div>
    </div>
    <div
      className={css`
        flex-grow: 1;
      `}
    >
      {children}
    </div>
  </div>
);
