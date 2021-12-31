import { css } from "@emotion/css";

export const Web3Theme = {
  modalText: css`
    background: #1e1e1e;
    box-shadow: 0px 2.7px 3px -2.5px rgba(0, 0, 0, 0.1),
      0px 1.1px 1.2px -1.3px rgba(0, 0, 0, 0.1),
      0px 0.7px 0.8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  `,
  modalClose: css`
    cursor: pointer;
    border: 0;
    background: transparent;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;

    path {
      fill: white;
    }
  `
};
