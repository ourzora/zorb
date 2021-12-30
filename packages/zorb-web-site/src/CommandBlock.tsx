import { css } from "@emotion/css";

export const CommandBlock = ({ children }: { children: React.ReactNode }) => (
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