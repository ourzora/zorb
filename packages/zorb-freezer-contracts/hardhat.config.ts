import "@nomiclabs/hardhat-waffle";
import "hardhat-gas-reporter";
import "hardhat-deploy";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";
import networks from "./networks";
import "./setup-env";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 80,
  },
  namedAccounts: {
    deployer: 0,
    // this is for string and on-chain helpers
    sharedNFTLogic: {
      1: "0x7eB947242dbF042e6388C329A614165d73548670",
      4: "0x2a3245d54E5407E276c47f0C181a22bf90c797Ce",
    },
    zorbNFT: {
      1: "0xCa21d4228cDCc68D4e23807E5e370C07577Dd152",
      4: "0xBD1489658219fe8393E43FC874c0c5ca5e5FCe2C",
    },
  },
  networks: {
    hardhat: {
      initialDate: new Date("1 January 2022 GMT").toString(),
    },
    ...networks,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 100,
          },
        },
      },
    ],
  },
};

export default config;
