import { ethers } from "ethers";
import { ZORB_CONTRACT } from "./env-vars";

const Contract = new ethers.Contract(ZORB_CONTRACT, [
  "function ownerOf(uint256) returns (address)",
  "function zorbForAddress(uint256) returns (string)",
]);

export async function getTokenInfo(tokenId: string) {
  const provider = new ethers.providers.JsonRpcBatchProvider(
    process.env.RPC_URL,
    parseInt(process.env.NETWORK_ID || "4")
  );
  const connectedContract = Contract.connect(provider);
  const [ownerAddress, zorbImage] = await Promise.all([
    connectedContract.ownerOf(tokenId),
    connectedContract.getZorbRender(tokenId),
  ]);
  return {ownerAddress, zorbImage};
}
