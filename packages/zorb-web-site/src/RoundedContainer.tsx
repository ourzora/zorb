import { css } from "@emotion/css";
import React from "react";

export const RoundedContainer = ({
  children,
  padding = '27px',
  margin = '0',
}: {
  children: React.ReactNode;
  padding?: string;
  margin?: string;
}) => (
  <div
    className={css`
      background: #1e1e1e;
      box-shadow: 0px 2.7px 3px -2.5px rgba(0, 0, 0, 0.1),
        0px 1.1px 1.2px -1.3px rgba(0, 0, 0, 0.1),
        0px 0.7px 0.8px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: ${padding};
      margin: ${margin};
    `}
  >
    {children}
  </div>
);
