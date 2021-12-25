import { NetworksUserConfig } from "hardhat/types";
import "./setup-env";

const networks: NetworksUserConfig = {};

let accounts: any = [];

if (process.env.DEV_MNEMONIC) {
  accounts = { mnemonic: process.env.DEV_MNEMONIC as string };
}

if (process.env.PRIVATE_KEY) {
  accounts = [process.env.PRIVATE_KEY];
}

if (process.env.RINKEBY_RPC) {
  networks.rinkeby = {
    chainId: 4,
    url: process.env.RINKEBY_RPC,
    accounts,
  };
}

if (process.env.MAINNET_RPC) {
  networks.mainnet = {
    chainId: 1,
    url: process.env.MAINNET_RPC,
    accounts,
  };
}

export default networks;
