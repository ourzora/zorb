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
    gasPrice: 40,
  },
  namedAccounts: {
    deployer: 0,
    erc721base: {
      // this is the erc721base logic contract deployment
      1: "0x43955024b1985E2b933A59021500aE5f55b04091",
      // this is the erc721base logic contract deployment
      4: "0x86c67a16C16BF784BdFE7D4b7575dB664D191F88",
    },
    // this is for string and on-chain helpers
    sharedNFTLogic: {
      1: "0x7eB947242dbF042e6388C329A614165d73548670",
      4: "0x2a3245d54E5407E276c47f0C181a22bf90c797Ce",
    },
  },
  networks,
  solidity: {
    compilers: [
      {
        version: "0.8.10",
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
